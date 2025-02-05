import type {FenceDevice} from "app/view/cluster/types";
import {
  LauncherDropdown,
  type LauncherItem as ToolbarItem,
} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";

export const FencePageToolbar = ({fenceDevice}: {fenceDevice: FenceDevice}) => {
  const {clusterName} = useLoadedCluster();
  const refresh: ToolbarItem = {
    name: "refresh",
    confirm: {
      title: "Refresh fence device?",
      description: (
        <>
          This makes the cluster forget the complete operation history
          (including failures) of the fence device and re-detects its current
          state.
        </>
      ),
      action: {
        type: "RESOURCE.REFRESH",
        key: {clusterName},
        payload: {
          resourceId: fenceDevice.id,
          resourceType: "fence-device",
        },
      },
    },
  };

  const cleanup: ToolbarItem = {
    name: "cleanup",
    confirm: {
      title: "Cleanup fence device?",
      description: (
        <>
          This makes the cluster forget failed operations from history of the
          fence device and re-detects its current state.
        </>
      ),
      action: {
        type: "RESOURCE.CLEANUP",
        key: {clusterName},
        payload: {
          resourceId: fenceDevice.id,
          resourceType: "fence-device",
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
        key: {clusterName},
        payload: {
          resourceIds: [fenceDevice.id],
          resourceType: "fence-device",
        },
      },
    },
  };
  return (
    <DetailToolbar
      buttonsItems={[refresh, cleanup]}
      dropdown={<LauncherDropdown items={[deleteItem]} />}
    />
  );
};
