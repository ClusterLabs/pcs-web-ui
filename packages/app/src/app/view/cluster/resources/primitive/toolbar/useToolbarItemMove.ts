import {LauncherItem as ToolbarItem} from "app/view/share";
import {Primitive} from "app/view/cluster/types";
import {useOpenTask} from "app/view/task";
import {useLoadedCluster} from "app/view/cluster/share";

export const useToolbarItemMove = (primitive: Primitive): ToolbarItem => {
  const {clusterName, nodeList} = useLoadedCluster();
  const openTask = useOpenTask();
  const openMoveTask = (resourceId: string) =>
    openTask("resourceMove", {
      type: "RESOURCE.MOVE.OPEN",
      payload: {
        clusterName,
        resourceId,
        nodeNameList: nodeList.map(n => n.name),
      },
    });

  if (primitive.inGroup === null && primitive.inClone === null) {
    return {
      name: "move",
      run: () => openMoveTask(primitive.id),
    };
  }

  if (primitive.inClone !== null) {
    return {
      name: "move",
      confirm: {
        title: "Cannot move primitive resource",
        titleVariant: "warning",
        description:
          "The resource is in the clone and cannot be moved individually."
          + " You can move the clone. ",
        label: "move the clone",
        run: () => openMoveTask(primitive.inClone as string),
      },
    };
  }

  return {
    name: "move",
    confirm: {
      title: "Cannot move primitive resource",
      titleVariant: "warning",
      description:
        "The resource is in the group and cannot be moved individually."
        + " You can move the whole group. ",
      label: "move the whole group",
      run: () => openMoveTask(primitive.inGroup as string),
    },
  };
};
