import {ActionPayload} from "app/store";
import {Clone} from "app/view/cluster/types";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

export const useOpenMoveTask = () => {
  const {clusterName, nodeList, resourceTree} = useLoadedCluster();
  const openTask = useOpenTask();
  return (
    resourceType: ActionPayload["RESOURCE.MOVE.OPEN"]["resourceType"],
    resourceId: string,
  ) =>
    openTask("resourceMove", {
      type: "RESOURCE.MOVE.OPEN",
      payload: {
        clusterName,
        resourceId,
        ...(resourceType !== "clone"
          ? {resourceType}
          : {
              resourceType,
              isPromotable:
                (
                  resourceTree.find(
                    r => r.itemType === "clone" && r.id === resourceId,
                  ) as Clone
                )?.promotable ?? false,
            }),
        nodeNameList: nodeList.map(n => n.name),
      },
    });
};
