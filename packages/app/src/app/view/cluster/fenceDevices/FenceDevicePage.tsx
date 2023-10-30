import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {
  GroupDetailSection,
  GroupDetailView,
  useLoadedCluster,
} from "app/view/cluster/share";
import {useOpenTask} from "app/view/cluster/task";

import {FenceDeviceDetailPage} from "./FenceDeviceDetailPage";
import {FenceDeviceList} from "./list";

const {fenceDevices, fenceDevicesToolbar} = testMarks.cluster;

export const FenceDevicePage = () => {
  const {fenceDeviceList, clusterName} = useLoadedCluster();
  const openTask = useOpenTask(clusterName);
  const launchDisable = useLauncherDisableClusterNotRunning();
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "create-fence-device",
            run: () =>
              openTask("fenceDeviceCreate", {
                type: "FENCE_DEVICE.CREATE.INIT",
                key: {clusterName},
                payload: {clusterName},
              }),
            launchDisable: launchDisable(
              "Cannot create resource on stopped cluster",
            ),
            ...fenceDevicesToolbar.createFenceDevice.mark,
          },
        ]}
        {...fenceDevicesToolbar.mark}
      />
      <GroupDetailSection {...testMarks.cluster.mark}>
        <GroupDetailView
          detailCard={<FenceDeviceDetailPage />}
          groupCard={<FenceDeviceList fenceDeviceList={fenceDeviceList} />}
          {...fenceDevices.mark}
        />
      </GroupDetailSection>
    </>
  );
};
