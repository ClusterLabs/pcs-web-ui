import {
  ApiResourceBase,
  ApiPrimitive,
  ApiResource,
  ApiClone,
  ApiGroup,
  ApiStonith,
} from "app/backend/types/clusterStatus";

import * as statusSeverity from "./statusSeverity";

import {
  StatusSeverity,
  FenceDeviceStatusFlag,
  Primitive,
  ResourceTreeItem,
  ResourceStatusInfo,
  ResourceStatus,
  FenceDevice,
  Group,
  Clone,
} from "../types";

import { transformIssues } from "./issues";

export const transformStatus = (
  status: ApiResource["status"],
): FenceDeviceStatusFlag => {
  switch (status) {
    case "running": return "RUNNING";
    case "blocked": return "BLOCKED";
    case "failed": return "FAILED";
    case "disabled": return "DISABLED";
    default: return "UNKNOWN";
  }
};

export const statusToSeverity = (
  status: ApiResource["status"],
): StatusSeverity => {
  switch (status) {
    case "blocked": return "ERROR";
    case "failed": return "ERROR";
    case "disabled": return "WARNING";
    case "running": return "OK";
    default: return "UNKNOWN";
  }
};

export const filterPrimitive = (
  candidateList: (ApiPrimitive|ApiStonith)[],
): ApiPrimitive[] => (
  candidateList.filter(
    (m): m is ApiPrimitive => m.class_type === "primitive",
  )
);

const isDisabled = (apiResource: ApiResourceBase) => apiResource.meta_attr.some(
  apiMetaAttribute => (
    apiMetaAttribute.name === "target-role"
    &&
    apiMetaAttribute.value.toLowerCase() === "stopped"
  )
);

const buildPrimitiveStatuInfoList = (
  apiPrimitive: ApiPrimitive,
): ResourceStatusInfo[] => {
  const infoList: ResourceStatusInfo[] = [];

  // warning
  if (apiPrimitive.crm_status.some(s => !s.managed)) {
    infoList.push({ label: "UNMANAGED", severity: "WARNING" })
  }

  if (isDisabled(apiPrimitive)) {
    infoList.push({ label: "DISABLED", severity: "WARNING" })
  }

  if (infoList.length > 0) {
    return infoList;
  }

  // ok
  if (apiPrimitive.crm_status.some(s => s.active)) {
    return [{ label: "RUNNING", severity: "OK" }];
  }

  // error
  if (
    apiPrimitive.crm_status.some(s => s.failed)
    ||
    apiPrimitive.operations.some(o => !(
      o.rc_code === 0
      ||
      // 7: OCF_NOT_RUNNING: The resource is safely stopped.
      (o.operation === "monitor" && o.rc_code === 7)
      ||
      // 8: OCF_RUNNING_MASTER: The resource is running in master mode.
      // 193: PCMK_OCF_UNKNOWN: The resource operation is still in progress.
      [8, 193].includes(o.rc_code)
    ))
  ) {
    return [{ label: "FAILED", severity: "ERROR" }];
  }
  return [{ label: "BLOCKED", severity: "ERROR" }];
};

const buildStatus = (statusInfoList: ResourceStatusInfo[]): ResourceStatus => {
  const maxSeverity = statusInfoList.reduce<StatusSeverity>(
    (maxSeverity, info) =>  statusSeverity.max(maxSeverity, info.severity),
    "OK",
  );
  return {
    infoList: statusInfoList.filter(si => si.severity === maxSeverity),
    maxSeverity,
  };
};

const toPrimitive = (apiResource: ApiPrimitive): Primitive => ({
  id: apiResource.id,
  itemType: "primitive",
  status: buildStatus(buildPrimitiveStatuInfoList(apiResource)),
  issueList: transformIssues(apiResource),
  class: apiResource.class,
  provider: apiResource.provider,
  type: apiResource.type,
  agentName:
    `${apiResource.class}:${apiResource.provider}:${apiResource.type}`
  ,
  // Decision: Last instance_attr wins!
  instanceAttributes: apiResource.instance_attr.reduce(
    (attrMap, nvpair) => ({
      ...attrMap,
      [nvpair.name]: { id: nvpair.id, value: nvpair.value },
    }),
    {},
  ),
});

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
    (maxSeverity, primitive) =>  statusSeverity.max(
      maxSeverity,
      primitive.status.maxSeverity,
    ),
    "OK",
  )

  //TODO members should not be OK when group is disabled
  if (maxSeverity === "OK") {
    infoList.push({ label: "RUNNING", severity: "OK" });
    return infoList;
  }

  const counts: Record<string, number> = members.reduce<Record<string, number>>(
    (counts, primitive) => {
      primitive.status.infoList
        .filter(info => info.severity === maxSeverity)
        .map(info => info.label)
        .forEach(label => {
          counts[label] = label in counts ? counts[label] + 1 : 1;
        })
      ;
      return counts;
    },
    {},
  );

  if (Object.keys(counts).length === 0) {
    infoList.push({ label: "UNKNOWN STATUS OF MEMBERS", severity: "WARNING" });
    return infoList;
  }

  return Object.keys(counts).map(label => ({
    label: `${counts[label]}/${members.length} ${label}`,
    severity: maxSeverity,
  }));
};

const toGroup = (apiGroup: ApiGroup): Group|undefined => {
  // Theoreticaly, group can contain primitive resources, stonith resources or
  // mix of both. A decision here is to filter out stonith...
  const primitiveMembers = filterPrimitive(apiGroup.members);
  // ...and accept only groups with some primitive resources.
  if (primitiveMembers.length === 0) {
    return undefined;
  }

  const resources = primitiveMembers.map(p => toPrimitive(p));
  return {
    id: apiGroup.id,
    itemType: "group",
    resources,
    status: buildStatus(buildGroupStatusInfoList(apiGroup, resources)),
    issueList: transformIssues(apiGroup),
  };
};

const buildCloneStatusInfoList = (
  apiClone: ApiClone,
): ResourceStatusInfo[]  => {
  const infoList: ResourceStatusInfo[] = [{
    label: apiClone.status,
    severity: statusToSeverity(apiClone.status),
  }];

  return infoList;
};

const toClone = (apiClone: ApiClone): Clone|undefined => {
  const member = apiClone.member.class_type === "primitive"
    ? toPrimitive(apiClone.member)
    : toGroup(apiClone.member)
  ;

  if (member === undefined) {
    return undefined;
  }

  return {
    id: apiClone.id,
    itemType: "clone",
    member,
    status: buildStatus(buildCloneStatusInfoList(apiClone)),
    issueList: transformIssues(apiClone),
  };
};

const toFenceDevice = (apiFenceDevice: ApiStonith): FenceDevice => ({
  id: apiFenceDevice.id,
  type: apiFenceDevice.type,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
});

export const analyzeApiResources = (
  apiResourceList: ApiResource[],
) => apiResourceList.reduce<{
    resourceTree: ResourceTreeItem[],
    resourcesSeverity: StatusSeverity,
    fenceDeviceList: FenceDevice[],
    fenceDevicesSeverity: StatusSeverity,
  }>(
    (analyzed, apiResource) => {
      const maxResourcesSeverity = () => statusSeverity.max(
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
          };

        case "group": {
          const group = toGroup(apiResource);
          // don't care about group of stonith only...
          return group === undefined ? analyzed : {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, group],
            resourcesSeverity: maxResourcesSeverity(),
          };
        }

        case "clone": default: {
          const clone = toClone(apiResource);
          // don't care about clone with stonith only...
          return clone === undefined ? analyzed : {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, clone],
            resourcesSeverity: maxResourcesSeverity(),
          };
        }
      }
    },
    {
      resourceTree: [],
      resourcesSeverity: "OK",
      fenceDeviceList: [],
      fenceDevicesSeverity: "OK",
    },
  );
