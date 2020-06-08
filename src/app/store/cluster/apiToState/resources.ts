import {
  ApiClone,
  ApiGroup,
  ApiPrimitive,
  ApiResource,
  ApiResourceBase,
  ApiStonith,
} from "app/backend/types/clusterStatus";

import * as statusSeverity from "./statusSeverity";

import {
  Clone,
  FenceDevice,
  FenceDeviceStatusFlag,
  Group,
  Issue,
  Primitive,
  ResourceOnNodeStatus,
  ResourceStatus,
  ResourceStatusInfo,
  ResourceTreeItem,
  StatusSeverity,
} from "../types";

import { transformIssues } from "./issues";

const transformStatus = (
  status: ApiResource["status"],
): FenceDeviceStatusFlag => {
  switch (status) {
    case "blocked":
      return "BLOCKED";
    case "failed":
      return "FAILED";
    case "disabled":
      return "DISABLED";
    case "running":
    default:
      return "RUNNING";
  }
};

const statusToSeverity = (status: ApiResource["status"]): StatusSeverity => {
  switch (status) {
    case "blocked":
      return "ERROR";
    case "failed":
      return "ERROR";
    case "disabled":
    case "partially running":
      return "WARNING";
    case "running":
    default:
      return "OK";
  }
};

const filterPrimitive = (
  candidateList: (ApiPrimitive | ApiStonith)[],
): ApiPrimitive[] =>
  candidateList.filter((m): m is ApiPrimitive => m.class_type === "primitive");

const isDisabled = (apiResource: ApiResourceBase): boolean =>
  apiResource.meta_attr.some(
    apiMetaAttribute =>
      apiMetaAttribute.name === "target-role"
      && apiMetaAttribute.value.toLowerCase() === "stopped",
  );

const buildPrimitiveStatuInfoList = (
  apiPrimitive: ApiPrimitive,
): {
  resourceStatusInfo: ResourceStatusInfo[];
  issues: Issue[];
} => {
  const infoList: ResourceStatusInfo[] = [];
  const issues: Issue[] = [];

  // warning
  if (apiPrimitive.crm_status.some(s => !s.managed)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is unmanaged",
    });
    infoList.push({ label: "UNMANAGED", severity: "WARNING" });
  }

  if (isDisabled(apiPrimitive)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is disabled",
    });
    infoList.push({ label: "DISABLED", severity: "WARNING" });
  }

  if (infoList.length > 0) {
    return {
      resourceStatusInfo: infoList,
      issues,
    };
  }

  // ok
  if (apiPrimitive.crm_status.some(s => s.active)) {
    return {
      resourceStatusInfo: [{ label: "RUNNING", severity: "OK" }],
      issues,
    };
  }

  // error
  if (
    apiPrimitive.crm_status.some(s => s.failed)
    || apiPrimitive.operations.some(
      o =>
        !(
          o.rc_code === 0
          // 7: OCF_NOT_RUNNING: The resource is safely stopped.
          || (o.operation === "monitor" && o.rc_code === 7)
          // 8: OCF_RUNNING_MASTER: The resource is running in master mode.
          // 193: PCMK_OCF_UNKNOWN: The resource operation is still in progress.
          || [8, 193].includes(o.rc_code)
        ),
    )
  ) {
    return {
      resourceStatusInfo: [{ label: "FAILED", severity: "ERROR" }],
      issues: [{ severity: "ERROR", message: "Resource failed" }],
    };
  }
  return {
    resourceStatusInfo: [{ label: "BLOCKED", severity: "ERROR" }],
    issues: [{ severity: "ERROR", message: "Resource is blocked" }],
  };
};

const buildStatus = (statusInfoList: ResourceStatusInfo[]): ResourceStatus => {
  const maxSeverity = statusInfoList.reduce<StatusSeverity>(
    (severity, info) => statusSeverity.max(severity, info.severity),
    "OK",
  );
  return {
    infoList: statusInfoList.filter(si => si.severity === maxSeverity),
    maxSeverity,
  };
};

const toPrimitive = (apiResource: ApiPrimitive): Primitive => {
  const { resourceStatusInfo, issues } = buildPrimitiveStatuInfoList(
    apiResource,
  );
  return {
    id: apiResource.id,
    itemType: "primitive",
    status: buildStatus(resourceStatusInfo),
    issueList: transformIssues(apiResource).concat(issues),
    class: apiResource.class,
    provider: apiResource.provider,
    type: apiResource.type,
    agentName: `${apiResource.class}:${apiResource.provider}:${apiResource.type}`,
    // Decision: Last instance_attr wins!
    instanceAttributes: apiResource.instance_attr.reduce(
      (attrMap, nvpair) => ({
        ...attrMap,
        [nvpair.name]: { id: nvpair.id, value: nvpair.value },
      }),
      {},
    ),
  };
};

const takeResourceOnNodeStatus = (
  apiResource: ApiPrimitive,
): ResourceOnNodeStatus[] =>
  apiResource.crm_status.map(
    (crmStatus): ResourceOnNodeStatus => ({
      resource: { id: apiResource.id },
      node:
        crmStatus.node === null
          ? null
          : {
            name: crmStatus.node.name,
          },
      active: crmStatus.active,
      failed: crmStatus.failed,
      failureIgnored: crmStatus.failure_ignored,
      managed: crmStatus.managed,
      targetRole: crmStatus.target_role,
      role: crmStatus.role,
      pending: crmStatus.pending,
      orphaned: crmStatus.orphaned,
      nodesRunningOn: crmStatus.nodes_running_on,
      blocked: apiResource.status === "blocked",
    }),
  );

const buildGroupStatusInfoList = (
  apiGroup: ApiGroup,
  members: Primitive[],
): ResourceStatusInfo[] => {
  const infoList: ResourceStatusInfo[] = [];
  if (isDisabled(apiGroup)) {
    infoList.push({ label: "DISABLED", severity: "WARNING" });
  }

  if (members.length === 0) {
    infoList.push({ label: "NO MEMBERS", severity: "WARNING" });
    return infoList;
  }

  const maxSeverity = members.reduce<StatusSeverity>(
    (severity, primitive) =>
      statusSeverity.max(severity, primitive.status.maxSeverity),
    "OK",
  );

  // TODO members should not be OK when group is disabled
  if (maxSeverity === "OK") {
    infoList.push({ label: "RUNNING", severity: "OK" });
    return infoList;
  }

  const labelCounts: Record<string, number> = members.reduce<
    Record<string, number>
  >((counts, primitive) => {
    const nextCounts = { ...counts };
    primitive.status.infoList
      .filter(info => info.severity === maxSeverity)
      .map(info => info.label)
      .forEach((label) => {
        nextCounts[label] = label in counts ? counts[label] + 1 : 1;
      });
    return nextCounts;
  }, {});

  if (Object.keys(labelCounts).length === 0) {
    infoList.push({ label: "UNKNOWN STATUS OF MEMBERS", severity: "WARNING" });
    return infoList;
  }

  Object.keys(labelCounts).forEach(label =>
    infoList.push({
      label: `${labelCounts[label]}/${members.length} ${label}`,
      severity: maxSeverity,
    }),
  );
  return infoList;
};

const toGroup = (
  apiGroup: ApiGroup,
): { group: Group; apiPrimitiveList: ApiPrimitive[] } => {
  // Theoreticaly, group can contain primitive resources, stonith resources or
  // mix of both. A decision here is to filter out stonith...
  const apiPrimitiveList = filterPrimitive(apiGroup.members);
  const resources = apiPrimitiveList.map(p => toPrimitive(p));
  return {
    apiPrimitiveList,
    group: {
      id: apiGroup.id,
      itemType: "group",
      resources,
      status: buildStatus(buildGroupStatusInfoList(apiGroup, resources)),
      issueList: transformIssues(apiGroup),
    },
  };
};

const buildCloneStatusInfoList = (apiClone: ApiClone): ResourceStatusInfo[] => {
  const infoList: ResourceStatusInfo[] = [
    {
      label: apiClone.status,
      severity: statusToSeverity(apiClone.status),
    },
  ];

  return infoList;
};

const toClone = (
  apiClone: ApiClone,
): { clone: Clone; apiPrimitiveList: ApiPrimitive[] } => {
  let member: Primitive | Group;
  let apiPrimitiveList: ApiPrimitive[] = [];
  if (apiClone.member.class_type === "primitive") {
    member = toPrimitive(apiClone.member);
    apiPrimitiveList = [apiClone.member];
  } else {
    ({ apiPrimitiveList, group: member } = toGroup(apiClone.member));
  }

  return {
    apiPrimitiveList,
    clone: {
      id: apiClone.id,
      itemType: "clone",
      member,
      status: buildStatus(buildCloneStatusInfoList(apiClone)),
      issueList: transformIssues(apiClone),
    },
  };
};

const toFenceDevice = (apiFenceDevice: ApiStonith): FenceDevice => ({
  id: apiFenceDevice.id,
  type: apiFenceDevice.type,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
});

type AnalyzedResources = {
  resourceTree: ResourceTreeItem[];
  resourcesSeverity: StatusSeverity;
  fenceDeviceList: FenceDevice[];
  fenceDevicesSeverity: StatusSeverity;
  resourceOnNodeStatusList: ResourceOnNodeStatus[];
};

export const analyzeApiResources = (
  apiResourceList: ApiResource[],
): AnalyzedResources =>
  apiResourceList.reduce<AnalyzedResources>(
    (analyzed, apiResource) => {
      const maxResourcesSeverity = (): StatusSeverity =>
        statusSeverity.max(
          analyzed.resourcesSeverity,
          statusToSeverity(apiResource.status),
        );
      switch (apiResource.class_type) {
        case "primitive":
          if (apiResource.class === "stonith") {
            return {
              ...analyzed,
              fenceDeviceList: [
                ...analyzed.fenceDeviceList,
                toFenceDevice(apiResource as ApiStonith),
              ],
              fenceDevicesSeverity: statusSeverity.max(
                analyzed.fenceDevicesSeverity,
                statusToSeverity(apiResource.status),
              ),
            };
          }
          return {
            ...analyzed,
            resourceTree: [
              ...analyzed.resourceTree,
              toPrimitive(apiResource as ApiPrimitive),
            ],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...takeResourceOnNodeStatus(apiResource as ApiPrimitive),
            ],
          };

        case "group": {
          if (filterPrimitive(apiResource.members).length === 0) {
            // don't care about group of stonith only...
            return analyzed;
          }
          const { apiPrimitiveList, group } = toGroup(apiResource);

          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, group],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...apiPrimitiveList.map(takeResourceOnNodeStatus).flat(),
            ],
          };
        }

        case "clone":
        default: {
          if (
            apiResource.member.class_type === "group"
            && filterPrimitive(apiResource.member.members).length === 0
          ) {
            // don't care about clone with group of stonith only...
            return analyzed;
          }
          const { apiPrimitiveList, clone } = toClone(apiResource);
          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, clone],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...apiPrimitiveList.map(takeResourceOnNodeStatus).flat(),
            ],
          };
        }
      }
    },
    {
      resourceTree: [],
      resourcesSeverity: "OK",
      fenceDeviceList: [],
      fenceDevicesSeverity: "OK",
      resourceOnNodeStatusList: [],
    },
  );
