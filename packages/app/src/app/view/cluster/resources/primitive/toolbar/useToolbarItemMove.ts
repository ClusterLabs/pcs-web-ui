import {LauncherItem as ToolbarItem} from "app/view/share";
import {Primitive} from "app/view/cluster/types";
import {useOpenTask} from "app/view/task";
import {useLoadedCluster} from "app/view/cluster/share";

export const useToolbarItemMove = (primitive: Primitive): ToolbarItem => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
  const openMoveTask = (resourceId: string) =>
    openTask("resourceMove", {
      type: "RESOURCE.MOVE.OPEN",
      key: {clusterName},
      payload: {
        clusterName,
        resourceId,
      },
    });

  const groupId = primitive.inGroup;

  return {
    name: "move",
    ...(groupId !== null
      ? {
          confirm: {
            title: "Cannot move resource",
            description:
              "The resource is in the group and cannot be moved individually."
              + " You can move the whole group. ",
            label: "move the whole group",
            run: () => openMoveTask(groupId),
          },
        }
      : {
          run: () => openMoveTask(primitive.id),
        }),
  };
};
