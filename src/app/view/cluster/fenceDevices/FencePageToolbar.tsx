import React from "react";

import { FenceDevice } from "app/view/cluster/types";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";

export const FencePageToolbar: React.FC<{ fenceDevice: FenceDevice }> = ({
  fenceDevice,
}) => {
  const cluster = useSelectedClusterName();
  const refresh: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.REFRESH",
      key: { clusterName: cluster },
      payload: {
        resourceId: fenceDevice.id,
        resourceType: "fence-device",
      },
    },
    confirm: {
      title: "Refresh fence device?",
      description: (
        <>
          This makes the cluster forget the complete operation history
          (including failures) of the fence device and re-detects its current
          state.
        </>
      ),
    },
  };

  const cleanup: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.CLEANUP",
      key: { clusterName: cluster },
      payload: {
        resourceId: fenceDevice.id,
        resourceType: "fence-device",
      },
    },
    confirm: {
      title: "Cleanup fence device?",
      description: (
        <>
          This makes the cluster forget failed operations from history of the
          fence device and re-detects its current state.
        </>
      ),
    },
  };

  const deleteItem: DetailLayoutToolbarAction = {
    action: {
      type: "RESOURCE.DELETE",
      key: { clusterName: cluster },
      payload: {
        resourceIds: [fenceDevice.id],
        resourceType: "fence-device",
      },
    },
    confirm: {
      title: "Delete resource?",
      description: <>This deletes the resource</>,
    },
  };
  return (
    <DetailLayoutToolbar
      toolbarName="fence-device"
      buttonActions={{
        refresh,
        cleanup,
      }}
      dropdownActions={{
        delete: deleteItem,
      }}
    />
  );
};
