import { Primitive } from "app/view/cluster/types";
import {
  DetailToolbar,
  TaskOpenArgs,
  LauncherItem as ToolbarItem,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";

const isPrimitiveManaged = (primitive: Primitive) =>
  primitive.metaAttributes.every(
    metaAttribute =>
      metaAttribute.name !== "is-managed" || metaAttribute.value !== "false",
  );

const isPrimitiveEnabled = (primitive: Primitive) =>
  primitive.metaAttributes.every(
    metaAttribute =>
      metaAttribute.name !== "target-role" || metaAttribute.value !== "Stopped",
  );

export const PrimitivePageToolbar = ({
  primitive,
}: {
  primitive: Primitive;
}) => {
  const { canChange: canChangeGroup } = task.groupChange.useTask();
  const clusterName = useSelectedClusterName();

  const unclone: ToolbarItem = {
    name: "unclone",
    confirm: {
      title: "Unclone resource?",
      description: (
        <>
          Remove the clone which contains the resource (the resource will not be
          removed).
        </>
      ),
      action: {
        type: "RESOURCE.UNCLONE",
        key: { clusterName },
        payload: {
          resourceId: primitive.id,
        },
      },
    },
  };

  const clone: ToolbarItem = {
    name: "clone",
    confirm: {
      title: "Clone resource?",
      description: "Set up the specified resource or group as a clone.",
      action: {
        type: "RESOURCE.CLONE",
        key: { clusterName },
        payload: {
          resourceId: primitive.id,
        },
      },
    },
  };

  const deleteItem: ToolbarItem = {
    name: "delete",
    confirm: {
      title: "Delete resource?",
      description: <>This deletes the resource</>,
      action: {
        type: "RESOURCE.DELETE",
        key: { clusterName },
        payload: {
          resourceIds: [primitive.id],
          resourceType: "resource",
        },
      },
    },
  };

  const refresh: ToolbarItem = {
    name: "refresh",
    confirm: {
      title: "Refresh resource?",
      description: (
        <>
          This makes the cluster forget the complete operation history
          (including failures) of the resource and re-detects its current state.
        </>
      ),
      action: {
        type: "RESOURCE.REFRESH",
        key: { clusterName },
        payload: {
          resourceId: primitive.id,
          resourceType: "resource",
        },
      },
    },
  };

  const cleanup: ToolbarItem = {
    name: "cleanup",
    confirm: {
      title: "Cleanup resource?",
      description: (
        <>
          This makes the cluster forget failed operations from history of the
          resource and re-detects its current state.
        </>
      ),
      action: {
        type: "RESOURCE.CLEANUP",
        key: { clusterName },
        payload: {
          resourceId: primitive.id,
          resourceType: "resource",
        },
      },
    },
  };

  const unmanage: ToolbarItem = {
    name: "unmanage",
    confirm: {
      title: "Unmanage resource?",
      description: "This disallows the cluster to start and stop the resource",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `unmanage "${primitive.id}"`,
          call: {
            name: "resource-unmanage",
            payload: { resource_or_tag_ids: [primitive.id] },
          },
        },
      },
    },
  };

  const manage: ToolbarItem = {
    name: "manage",
    confirm: {
      title: "Manage resource?",
      description: "This allows the cluster to start and stop the resource",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `manage "${primitive.id}"`,
          call: {
            name: "resource-manage",
            payload: { resource_or_tag_ids: [primitive.id] },
          },
        },
      },
    },
  };

  const disable: ToolbarItem = {
    name: "disable",
    confirm: {
      title: "Disable resource?",
      description: (
        <>
          This attempts to stop the resource if they are running and forbid the
          cluster from starting it again.
        </>
      ),
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `disable "${primitive.id}"`,
          call: {
            name: "resource-disable",
            payload: { resource_or_tag_ids: [primitive.id] },
          },
        },
      },
    },
  };

  const enable: ToolbarItem = {
    name: "enable",
    confirm: {
      title: "Enable resource?",
      description: "This allows the cluster to start the resource",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `enable "${primitive.id}"`,
          call: {
            name: "resource-enable",
            payload: { resource_or_tag_ids: [primitive.id] },
          },
        },
      },
    },
  };

  const groupChangeOpenArgs: TaskOpenArgs<typeof task.groupChange.useTask> = [
    primitive,
  ];
  return (
    <>
      <DetailToolbar
        toolbarName="primitive"
        buttonsItems={[
          ...[isPrimitiveManaged(primitive) ? unmanage : manage],
          ...[isPrimitiveEnabled(primitive) ? disable : enable],
        ]}
        dropdownItems={[
          {
            name: "change-group",
            task: {
              component: task.groupChange.Task,
              useTask: task.groupChange.useTask,
              openArgs: groupChangeOpenArgs,
            },
            disabled: !canChangeGroup(primitive),
          },
          refresh,
          cleanup,
          ...(primitive.inGroup !== null
            ? []
            : [primitive.inClone ? unclone : clone]),
          deleteItem,
        ]}
      />
    </>
  );
};
