import React from "react";

import { types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view";

type Primitive = types.cluster.Primitive;

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

export const PrimitivePageToolbar: React.FC<{
  primitive: Primitive;
}> = ({ primitive }) => {
  const cluster = useSelectedClusterName();

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
      id: { cluster },
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
      id: { cluster },
      payload: {
        resourceId: primitive.id,
      },
    },
  };

  const deleteItem: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.DELETE",
      id: { cluster },
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
      id: { cluster },
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
      id: { cluster },
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
      id: { cluster },
      payload: {
        taskLabel: `unmanage "${primitive.id}"`,
        call: {
          command: "resource-unmanage",
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
      id: { cluster },
      payload: {
        taskLabel: `manage "${primitive.id}"`,
        call: {
          command: "resource-manage",
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
      id: { cluster },
      payload: {
        taskLabel: `disable "${primitive.id}"`,
        call: {
          command: "resource-disable",
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
      id: { cluster },
      payload: {
        taskLabel: `enable "${primitive.id}"`,
        call: {
          command: "resource-enable",
          payload: { resource_or_tag_ids: [primitive.id] },
        },
      },
    },
    confirm: {
      title: "Enable resource?",
      description: "This allows the cluster to start the resource",
    },
  };

  const cloneUnclone: Record<
    string,
    DetailLayoutToolbarAction
  > = primitive.inClone ? { unclone } : { clone };

  return (
    <DetailLayoutToolbar
      buttonActions={{
        ...(isPrimitiveManaged(primitive) ? { unmanage } : { manage }),
        ...(isPrimitiveEnabled(primitive) ? { disable } : { enable }),
      }}
      dropdownActions={{
        refresh,
        cleanup,
        ...(primitive.inGroup ? {} : cloneUnclone),
        delete: deleteItem,
      }}
    />
  );
};
