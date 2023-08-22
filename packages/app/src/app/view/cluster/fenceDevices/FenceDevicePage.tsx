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

import * as task from "./task";
import {FenceDeviceDetailPage} from "./FenceDeviceDetailPage";
import {FenceDeviceList} from "./list";

const {fenceDevices, fenceDevicesToolbar} = testMarks.cluster;

export const FenceDevicePage = () => {
  const {fenceDeviceList} = useLoadedCluster();
  const launchDisable = useLauncherDisableClusterNotRunning();
  return (
    <>
      <ClusterToolbar
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
