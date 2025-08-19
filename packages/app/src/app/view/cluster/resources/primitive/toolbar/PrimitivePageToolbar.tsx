import {testMarks} from "app/view/dataTest";
import type {Primitive} from "app/view/cluster/types";
import {
  LauncherDropdown,
  type LauncherItem as ToolbarItem,
} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";
import {useOpenMoveBanTask} from "app/view/cluster/resources";
import {useOpenTask} from "app/view/task";

import {useToolbarItemMoveBan} from "./useToolbarItemMoveBan";
import {useToolbarItemGroupChange} from "./useToolbarItemGroupChange";

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

const {toolbar} = testMarks.cluster.resources.currentPrimitive;

export const PrimitivePageToolbar = ({primitive}: {primitive: Primitive}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
  const openMoveBanTask = useOpenMoveBanTask();

  const move = useToolbarItemMoveBan(primitive, "move");
  const ban = useToolbarItemMoveBan(primitive, "ban");
  const clear = {
    name: "clear",
    run: () => openMoveBanTask("primitive resource", primitive.id, "clear"),
  };

  const changeGroup = {
    ...useToolbarItemGroupChange(primitive),
    ...toolbar.dropdown.changeGroup.mark,
  };

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
        key: {clusterName},
        payload: {
          resourceId: primitive.id,
        },
      },
    },
    ...toolbar.dropdown.unclone.mark,
  };

  const clone: ToolbarItem = {
    name: "clone",
    confirm: {
      title: "Clone resource?",
      description: "Set up the specified resource or group as a clone.",
      action: {
        type: "RESOURCE.CLONE",
        key: {clusterName},
        payload: {
          resourceId: primitive.id,
        },
      },
    },
    ...toolbar.dropdown.clone.mark,
  };

  const deleteItem: ToolbarItem = {
    name: "delete",
    run: () =>
      openTask("resourceDelete", {
        type: "RESOURCE.DELETE.INIT",
        key: {clusterName},
        payload: {resourceId: primitive.id, resourceType: "resource"},
      }),
    ...toolbar.dropdown.delete.mark,
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
        key: {clusterName},
        payload: {
          resourceId: primitive.id,
          resourceType: "resource",
        },
      },
    },
    ...toolbar.dropdown.refresh.mark,
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
        key: {clusterName},
        payload: {
          resourceId: primitive.id,
          resourceType: "resource",
        },
      },
    },
    ...toolbar.dropdown.cleanup.mark,
  };

  const unmanage: ToolbarItem = {
    name: "unmanage",
    confirm: {
      title: "Unmanage resource?",
      description: "This disallows the cluster to start and stop the resource",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: {clusterName},
        payload: {
          taskLabel: `unmanage "${primitive.id}"`,
          call: {
            name: "resource-unmanage",
            payload: {resource_or_tag_ids: [primitive.id]},
          },
        },
      },
    },
    ...toolbar.unmanage.mark,
  };

  const manage: ToolbarItem = {
    name: "manage",
    confirm: {
      title: "Manage resource?",
      description: "This allows the cluster to start and stop the resource",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: {clusterName},
        payload: {
          taskLabel: `manage "${primitive.id}"`,
          call: {
            name: "resource-manage",
            payload: {resource_or_tag_ids: [primitive.id]},
          },
        },
      },
    },
    ...toolbar.manage.mark,
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
        key: {clusterName},
        payload: {
          taskLabel: `disable "${primitive.id}"`,
          call: {
            name: "resource-disable",
            payload: {resource_or_tag_ids: [primitive.id]},
          },
        },
      },
    },
    ...toolbar.disable.mark,
  };

  const enable: ToolbarItem = {
    name: "enable",
    confirm: {
      title: "Enable resource?",
      description: "This allows the cluster to start the resource",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: {clusterName},
        payload: {
          taskLabel: `enable "${primitive.id}"`,
          call: {
            name: "resource-enable",
            payload: {resource_or_tag_ids: [primitive.id]},
          },
        },
      },
    },
    ...toolbar.enable.mark,
  };

  return (
    <DetailToolbar
      buttonsItems={[
        ...[isPrimitiveManaged(primitive) ? unmanage : manage],
        ...[isPrimitiveEnabled(primitive) ? disable : enable],
      ]}
      dropdown={
        <LauncherDropdown
          items={[
            changeGroup,
            refresh,
            cleanup,
            ...(primitive.inGroup !== null
              ? []
              : [primitive.inClone !== null ? unclone : clone]),
            {...move, ...toolbar.dropdown.move.mark},
            {...ban, ...toolbar.dropdown.ban.mark},
            {...clear, ...toolbar.dropdown.clear.mark},
            deleteItem,
          ]}
          {...toolbar.dropdown.mark}
        />
      }
      {...toolbar.mark}
    />
  );
};
