import { Primitive } from "app/view/cluster/types";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  TaskLauncher,
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

  const unclone: DetailLayoutToolbarAction = {
    confirm: {
      title: "Unclone resource?",
      description: (
        <>
          Remove the clone which contains the resource (the resource will not be
          removed).
        </>
      ),
    },
    action: {
      type: "RESOURCE.UNCLONE",
      key: { clusterName },
      payload: {
        resourceId: primitive.id,
      },
    },
  };

  const clone: DetailLayoutToolbarAction = {
    confirm: {
      title: "Clone resource?",
      description: "Set up the specified resource or group as a clone.",
    },
    action: {
      type: "RESOURCE.CLONE",
      key: { clusterName },
      payload: {
        resourceId: primitive.id,
      },
    },
  };

  const deleteItem: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.DELETE",
      key: { clusterName },
      payload: {
        resourceIds: [primitive.id],
        resourceType: "resource",
      },
    },
    confirm: {
      title: "Delete resource?",
      description: <>This deletes the resource</>,
    },
  };

  const refresh: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.REFRESH",
      key: { clusterName },
      payload: {
        resourceId: primitive.id,
        resourceType: "resource",
      },
    },
    confirm: {
      title: "Refresh resource?",
      description: (
        <>
          This makes the cluster forget the complete operation history
          (including failures) of the resource and re-detects its current state.
        </>
      ),
    },
  };

  const cleanup: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.CLEANUP",
      key: { clusterName },
      payload: {
        resourceId: primitive.id,
        resourceType: "resource",
      },
    },
    confirm: {
      title: "Cleanup resource?",
      description: (
        <>
          This makes the cluster forget failed operations from history of the
          resource and re-detects its current state.
        </>
      ),
    },
  };

  const unmanage: DetailLayoutToolbarAction = {
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
    confirm: {
      title: "Unmanage resource?",
      description: "This disallows the cluster to start and stop the resource",
    },
  };

  const manage: DetailLayoutToolbarAction = {
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
    confirm: {
      title: "Manage resource?",
      description: "This allows the cluster to start and stop the resource",
    },
  };

  const disable: DetailLayoutToolbarAction = {
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
    confirm: {
      title: "Disable resource?",
      description: (
        <>
          This attempts to stop the resource if they are running and forbid the
          cluster from starting it again.
        </>
      ),
    },
  };

  const enable: DetailLayoutToolbarAction = {
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
    confirm: {
      title: "Enable resource?",
      description: "This allows the cluster to start the resource",
    },
  };

  const cloneUnclone: Record<string, DetailLayoutToolbarAction> =
    primitive.inClone ? { unclone } : { clone };

  return (
    <>
      <DetailLayoutToolbar
        toolbarName="primitive"
        buttonActions={{
          ...(isPrimitiveManaged(primitive) ? { unmanage } : { manage }),
          ...(isPrimitiveEnabled(primitive) ? { disable } : { enable }),
          "change group": (
            <TaskLauncher
              taskComponent={task.groupChange.Task}
              useTask={task.groupChange.useTask}
              openArgs={[primitive]}
              label="Change group"
              variant="secondary"
              isDisabled={!canChangeGroup(primitive)}
            />
          ),
        }}
        dropdownActions={{
          refresh,
          cleanup,
          ...(primitive.inGroup !== null ? {} : cloneUnclone),
          delete: deleteItem,
        }}
      />
    </>
  );
};
