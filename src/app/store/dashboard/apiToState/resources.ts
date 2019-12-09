import { ApiResource } from "app/backend/types/clusterOverview";

import { apiToState as clusterApiToState, types } from "../../cluster";
import { ResourceTreeItem, FenceDevice } from "../types";


const toResourceItem = (apiResource: ApiResource): ResourceTreeItem => ({
  id: apiResource.id,
  itemType: "group",
  status: clusterApiToState.resourceTransformStatus(apiResource.status),
  issueList: clusterApiToState.transformIssues(apiResource),
  statusSeverity: clusterApiToState.resourceStatusToSeverity(
    apiResource.status,
  ),
});

const isGroupWithoutPrimitives = (apiResource: ApiResource) => (
  apiResource.class_type === "group"
  &&
  clusterApiToState.filterPrimitive(apiResource.members).length === 0
);

export const analyzeApiResources = (apiResourceList: ApiResource[]) => (
  apiResourceList.reduce<{
    resourceTree: ResourceTreeItem[],
    resourcesSeverity: types.StatusSeverity,
    fenceDeviceList: FenceDevice[],
    fenceDevicesSeverity: types.StatusSeverity,
  }>(
    (analyzed, ar) => {
      if (ar.class_type === "primitive" && ar.class === "stonith") {
        return {
          ...analyzed,
          fenceDeviceList: [...analyzed.fenceDeviceList, toResourceItem(ar)],
          fenceDevicesSeverity: clusterApiToState.maxStatusSeverity(
            analyzed.fenceDevicesSeverity,
            clusterApiToState.resourceStatusToSeverity(ar.status),
          ),
        };
      }

      if (
        isGroupWithoutPrimitives(ar)
      ||
      (ar.class_type === "clone" && isGroupWithoutPrimitives(ar.member))
      ) {
        return analyzed;
      }

      return {
        ...analyzed,
        resourceTree: [...analyzed.resourceTree, toResourceItem(ar)],
        resourcesSeverity: clusterApiToState.maxStatusSeverity(
          analyzed.resourcesSeverity,
          clusterApiToState.resourceStatusToSeverity(ar.status),
        ),
      };
    },
    {
      resourceTree: [],
      resourcesSeverity: "OK",
      fenceDeviceList: [],
      fenceDevicesSeverity: "OK",
    },
  )
);
