import {
  ApiPrimitive,
  ApiResource,
  ApiClone,
  ApiGroup,
  ApiStonith,
} from "app/common/backend/types/clusterStatus";
import { StatusSeverity } from "app/common/types";
import { typeIs, statusSeverity } from "app/common/utils";

import {
  ResourceStatusFlag,
  Primitive,
  ResourceTreeItem,
  FenceDevice,
  Group,
  Clone,
} from "../types";

import { transformIssues } from "./issues";

export const transformStatus = (
  status: ApiResource["status"],
): ResourceStatusFlag => {
  switch (status) {
    case "running": return "RUNNING";
    case "blocked": return "BLOCKED";
    case "failed": return "FAILED";
    default: return "UNKNOWN";
  }
};

export const statusToSeverity = (
  status: ApiResource["status"],
): StatusSeverity => {
  switch (status) {
    case "blocked": return "ERROR";
    case "failed": return "ERROR";
    case "running": return "OK";
    default: return "UNKNOWN";
  }
};

const toPrimitive = (apiResource: ApiPrimitive): Primitive => ({
  id: apiResource.id,
  itemType: "primitive",
  status: transformStatus(apiResource.status),
  statusSeverity: statusToSeverity(apiResource.status),
  issueList: transformIssues(apiResource),
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
});

export const filterPrimitive = (
  candidateList: (ApiPrimitive|ApiStonith)[],
): ApiPrimitive[] => (
  candidateList.filter(
    (m): m is ApiPrimitive => m.class_type === "primitive",
  )
);

const toResourceTreeGroup = (apiGroup: ApiGroup): Group|undefined => {
  // Theoreticaly, group can contain primitive resources, stonith resources or
  // mix of both. A decision here is to filter out stonith...
  const primitiveMembers = filterPrimitive(apiGroup.members);
  // ...and accept only groups with some primitive resources.
  if (primitiveMembers.length === 0) {
    return undefined;
  }

  return {
    id: apiGroup.id,
    itemType: "group",
    resources: primitiveMembers.map(toPrimitive),
    status: transformStatus(apiGroup.status),
    statusSeverity: statusToSeverity(apiGroup.status),
    issueList: transformIssues(apiGroup),
  };
};

const toResourceTreeClone = (apiClone: ApiClone): Clone|undefined => {
  const member = apiClone.member.class_type === "primitive"
    ? toPrimitive(apiClone.member)
    : toResourceTreeGroup(apiClone.member)
  ;

  if (member === undefined) {
    return undefined;
  }
  return {
    id: apiClone.id,
    itemType: "clone",
    member,
    status: transformStatus(apiClone.status),
    statusSeverity: statusToSeverity(apiClone.status),
    issueList: transformIssues(apiClone),
  };
};

const toFenceDevice = (apiFenceDevice: ApiStonith): FenceDevice => ({
  id: apiFenceDevice.id,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
});

export const analyzeApiResources = (
  apiResourceList: ApiResource[],
) => apiResourceList.reduce(
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
        const group = toResourceTreeGroup(apiResource);
        // don't care about group of stonith only...
        return group === undefined ? analyzed : {
          ...analyzed,
          resourceTree: [...analyzed.resourceTree, group],
          resourcesSeverity: maxResourcesSeverity(),
        };
      }

      case "clone": default: {
        const clone = toResourceTreeClone(apiResource);
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
    resourceTree: typeIs<ResourceTreeItem[]>([]),
    resourcesSeverity: typeIs<StatusSeverity>("OK"),
    fenceDeviceList: typeIs<FenceDevice[]>([]),
    fenceDevicesSeverity: typeIs<StatusSeverity>("OK"),
  },
);
