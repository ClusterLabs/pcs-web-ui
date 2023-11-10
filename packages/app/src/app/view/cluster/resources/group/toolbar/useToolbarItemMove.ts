import {ActionPayload} from "app/store";
import {LauncherItem as ToolbarItem} from "app/view/share";
import {Group} from "app/view/cluster/types";
import {useOpenTask} from "app/view/task";
import {useLoadedCluster} from "app/view/cluster/share";

export const useToolbarItemMove = (group: Group): ToolbarItem => {
  const {clusterName, nodeList} = useLoadedCluster();
  const openTask = useOpenTask();
  const openMoveTask = (
    resourceId: string,
    resourceType: ActionPayload["RESOURCE.MOVE.OPEN"]["resourceType"],
  ) =>
    openTask("resourceMove", {
      type: "RESOURCE.MOVE.OPEN",
      payload: {
        clusterName,
        resourceId,
        resourceType,
        nodeNameList: nodeList.map(n => n.name),
      },
    });

  if (group.inClone === null) {
    return {
      name: "move",
      run: () => openMoveTask(group.id, "group"),
    };
  }

  return {
    name: "move",
    confirm: {
      title: "Cannot move group",
      description:
        "The group is in the clone and cannot be moved individually."
        + " You can move the clone. ",
      label: "move the clone",
      titleVariant: "warning",
      run: () => openMoveTask(group.inClone as string, "clone"),
    },
  };
};
