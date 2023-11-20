import {LauncherItem as ToolbarItem} from "app/view/share";
import {Primitive} from "app/view/cluster/types";
import {useOpenMoveBanTask} from "app/view/cluster/resources";

export const useToolbarItemMoveBan = (
  primitive: Primitive,
  operation: "move" | "ban",
): ToolbarItem => {
  const openMoveTask = useOpenMoveBanTask();

  if (primitive.inGroup === null && primitive.inClone === null) {
    return {
      name: operation,
      run: () => openMoveTask("primitive resource", primitive.id, operation),
    };
  }

  if (primitive.inClone !== null) {
    return {
      name: operation,
      confirm: {
        title: `Cannot ${operation} primitive resource`,
        titleVariant: "warning",
        description: `The resource is in the clone and cannot be ${
          operation === "move" ? "moved" : "banned"
        } individually. You can ${operation} the whole group. `,
        label: `${operation} the clone`,
        run: () =>
          openMoveTask("clone", primitive.inClone as string, operation),
      },
    };
  }

  return {
    name: operation,
    confirm: {
      title: `Cannot ${operation} primitive resource`,
      titleVariant: "warning",
      description: `The resource is in the group and cannot be ${
        operation === "move" ? "moved" : "banned"
      } individually. You can ${operation} the whole group. `,
      label: `${operation} the whole group`,
      run: () => openMoveTask("group", primitive.inGroup as string, operation),
    },
  };
};
