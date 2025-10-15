import {testMarks} from "app/view/dataTest";
import type {FenceDevice} from "app/view/cluster/types";
import {
  LauncherDropdown,
  type LauncherItem as ToolbarItem,
} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

const {toolbar} = testMarks.cluster.fenceDevices.currentFenceDevice;

const isFenceDeviceEnabled = (fenceDevice: FenceDevice) =>
  fenceDevice.metaAttributes.every(
    metaAttribute =>
      metaAttribute.name !== "target-role" || metaAttribute.value !== "Stopped",
  );

export const FencePageToolbar = ({fenceDevice}: {fenceDevice: FenceDevice}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
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
    ...toolbar.refresh.mark,
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
    ...toolbar.dropdown.cleanup.mark,
  };

  const deleteItem: ToolbarItem = {
    name: "delete",
    run: () =>
      openTask("resourceDelete", {
        type: "RESOURCE.DELETE.INIT",
        key: {clusterName},
        payload: {resourceId: fenceDevice.id, resourceType: "fence-device"},
      }),
    ...toolbar.dropdown.delete.mark,
  };

  const disable: ToolbarItem = {
    name: "disable",
    run: () =>
      openTask("fenceDeviceDisable", {
        type: "FENCE_DEVICE.DISABLE.INIT",
        key: {clusterName},
        payload: {
          fenceDeviceName: fenceDevice.id,
        },
      }),
    ...toolbar.disable.mark,
  };

  const enable: ToolbarItem = {
    name: "enable",
    confirm: {
      title: "Enable fence device?",
      description: "Allow the cluster to use the stonith devices.",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: {clusterName},
        payload: {
          taskLabel: `enable "${fenceDevice.id}"`,
          call: {
            name: "resource-enable",
            payload: {resource_or_tag_ids: [fenceDevice.id]},
          },
        },
      },
    },
    ...toolbar.enable.mark,
  };

  return (
    <DetailToolbar
      buttonsItems={[
        ...[isFenceDeviceEnabled(fenceDevice) ? disable : enable],
        refresh,
      ]}
      dropdown={<LauncherDropdown items={[cleanup, deleteItem]} />}
    />
  );
};
