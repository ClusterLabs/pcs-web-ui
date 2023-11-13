import {LauncherItem as ToolbarItem} from "app/view/share";
import {Group} from "app/view/cluster/types";
import {useOpenMoveTask} from "app/view/cluster/resources";

export const useToolbarItemMove = (group: Group): ToolbarItem => {
  const openMoveTask = useOpenMoveTask();

  if (group.inClone === null) {
    return {
      name: "move",
      run: () => openMoveTask("group", group.id),
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
      run: () => openMoveTask("clone", group.inClone as string),
    },
  };
};
