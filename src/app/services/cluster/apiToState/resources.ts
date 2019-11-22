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
import { ResourceIdConstraintsMap } from "./constraints";

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

export const filterPrimitive = (
  candidateList: (ApiPrimitive|ApiStonith)[],
): ApiPrimitive[] => (
  candidateList.filter(
    (m): m is ApiPrimitive => m.class_type === "primitive",
  )
);


const bindConstraints = (constraints: ResourceIdConstraintsMap) => {
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
    constraints: constraints[apiResource.id] || [],
  });

  const toGroup = (apiGroup: ApiGroup): Group|undefined => {
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
      resources: primitiveMembers.map(p => toPrimitive(p)),
      status: transformStatus(apiGroup.status),
      statusSeverity: statusToSeverity(apiGroup.status),
      issueList: transformIssues(apiGroup),
      constraints: constraints[apiGroup.id] || [],
    };
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
      status: transformStatus(apiClone.status),
      statusSeverity: statusToSeverity(apiClone.status),
      issueList: transformIssues(apiClone),
      constraints: constraints[apiClone.id] || [],
    };
  };

  return { toClone, toGroup, toPrimitive };
};

const toFenceDevice = (apiFenceDevice: ApiStonith): FenceDevice => ({
  id: apiFenceDevice.id,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
});

export const analyzeApiResources = (
  apiResourceList: ApiResource[],
  assignedConstraints: ResourceIdConstraintsMap,
) => {
  const { toPrimitive, toClone, toGroup } = bindConstraints(
    assignedConstraints,
  );
  return apiResourceList.reduce(
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
      resourceTree: typeIs<ResourceTreeItem[]>([]),
      resourcesSeverity: typeIs<StatusSeverity>("OK"),
      fenceDeviceList: typeIs<FenceDevice[]>([]),
      fenceDevicesSeverity: typeIs<StatusSeverity>("OK"),
    },
  );
};
