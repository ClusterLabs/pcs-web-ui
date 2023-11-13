import {ActionPayload} from "app/store";
import {LauncherItem as ToolbarItem} from "app/view/share";
import {Clone, Primitive} from "app/view/cluster/types";
import {useOpenTask} from "app/view/task";
import {useLoadedCluster} from "app/view/cluster/share";

export const useToolbarItemMove = (primitive: Primitive): ToolbarItem => {
  const {clusterName, nodeList, resourceTree} = useLoadedCluster();
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

  if (primitive.inGroup === null && primitive.inClone === null) {
    return {
      name: "move",
      run: () => openMoveTask(primitive.id, "primitive resource"),
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
        run: () => openMoveTask(primitive.inClone as string, "clone"),
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
      run: () => openMoveTask(primitive.inGroup as string, "group"),
    },
  };
};
