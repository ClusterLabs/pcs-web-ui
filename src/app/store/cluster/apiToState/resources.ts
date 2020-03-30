import {
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

const buildPrimitiveStatuInfoList = (
  apiPrimitive: ApiPrimitive,
): ResourceStatusInfo[] => {
  const infoList: ResourceStatusInfo[] = [{
    label: apiPrimitive.status,
    severity: statusToSeverity(apiPrimitive.status),
  }];

  if (apiPrimitive.crm_status.some(s => !s.managed)) {
    infoList.push({ label: "UNMANAGED", severity: "WARNING" })
  }

  return infoList;
};

const buildStatus = (statusInfoList: ResourceStatusInfo[]): ResourceStatus => ({
  infoList: statusInfoList,
  maxSeverity: statusInfoList.reduce<StatusSeverity>(
    (maxSeverity, info) =>  statusSeverity.max(maxSeverity, info.severity),
    "OK",
  ),
});

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

  if (members.length === 0) {
    return [{ label: "NO MEMBERS", severity: "WARNING" }];
  }

  const maxSeverity = members.reduce<StatusSeverity>(
    (maxSeverity, primitive) =>  statusSeverity.max(
      maxSeverity,
      primitive.status.maxSeverity,
    ),
    "OK",
  )

  if (maxSeverity === "OK") {
    return [{ label: "RUNNING", severity: "OK" }];
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
    return [{ label: "UNKNOWN STATUS OF MEMBERS", severity: "WARNING" }];
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
