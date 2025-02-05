import type {LauncherItem as ToolbarItem} from "app/view/share";
import type {Group} from "app/view/cluster/types";
import {useOpenMoveBanTask} from "app/view/cluster/resources";

export const useToolbarItemMoveBan = (
  group: Group,
  operation: "move" | "ban",
): ToolbarItem => {
  const openMoveTask = useOpenMoveBanTask();

  if (group.inClone === null) {
    return {
      name: operation,
      run: () => openMoveTask("group", group.id, operation),
    };
  }

  return {
    name: operation,
    confirm: {
      title: `Cannot ${operation} group`,
      description: `The resource is in the clone and cannot be ${
        operation === "move" ? "moved" : "banned"
      } individually. You can ${operation} the whole group. `,
      label: `${operation} the clone`,
      titleVariant: "warning",
      run: () => openMoveTask("clone", group.inClone as string, operation),
    },
  };
};
