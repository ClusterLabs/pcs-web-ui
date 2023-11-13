import {LauncherItem as ToolbarItem} from "app/view/share";
import {Primitive} from "app/view/cluster/types";
import {useOpenMoveTask} from "app/view/cluster/resources";

export const useToolbarItemMove = (primitive: Primitive): ToolbarItem => {
  const openMoveTask = useOpenMoveTask();

  if (primitive.inGroup === null && primitive.inClone === null) {
    return {
      name: "move",
      run: () => openMoveTask("primitive resource", primitive.id),
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
        run: () => openMoveTask("clone", primitive.inClone as string),
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
      run: () => openMoveTask("group", primitive.inGroup as string),
    },
  };
};
