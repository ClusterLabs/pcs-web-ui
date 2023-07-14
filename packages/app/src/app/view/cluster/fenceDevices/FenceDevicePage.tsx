import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  GroupDetailView,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import * as task from "./task";
import {FenceDeviceDetailPage} from "./FenceDeviceDetailPage";
import {FenceDeviceList} from "./list";

const {fenceDevices, fenceDevicesToolbar} = testMarks.clusterDetail;

export const FenceDevicePage = () => {
  const {fenceDeviceList} = useLoadedCluster();
  const launchDisable = useLauncherDisableClusterNotRunning();
  return (
    <>
      <ClusterToolbar
        toolbarName="fence-devices"
        buttonsItems={[
          {
            name: "create-fence-device",
            task: {
              component: task.create.FenceDeviceCreate,
              useTask: task.create.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create resource on stopped cluster",
            ),
            ...fenceDevicesToolbar.createFenceDevice.mark,
          },
        ]}
        {...fenceDevicesToolbar.mark}
      />
      <GroupDetailView
        detailCard={<FenceDeviceDetailPage />}
        groupCard={<FenceDeviceList fenceDeviceList={fenceDeviceList} />}
        {...fenceDevices.mark}
      />
    </>
  );
};
