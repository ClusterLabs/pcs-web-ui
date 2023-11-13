import {ActionPayload} from "app/store";
import {Clone} from "app/view/cluster/types";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

type Operation = "move" | "ban";
const operationMap = {
  move: {
    taskName: "resourceMove",
    actionType: "RESOURCE.MOVE.OPEN",
  },
  ban: {
    taskName: "resourceBan",
    actionType: "RESOURCE.BAN.OPEN",
  },
} satisfies Record<
  Operation,
  {
    taskName: Parameters<ReturnType<typeof useOpenTask>>[0];
    actionType: keyof ActionPayload;
  }
>;

type ActionTypes =
  (typeof operationMap)[keyof typeof operationMap]["actionType"];

export const useOpenMoveBanTask = () => {
  const {clusterName, nodeList, resourceTree} = useLoadedCluster();
  const openTask = useOpenTask();
  return (
    resourceType: ActionPayload[ActionTypes]["resourceType"],
    resourceId: string,
    operation: Operation,
  ) => {
    const {taskName, actionType} = operationMap[operation];
    return openTask(taskName, {
      type: actionType,
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
};
