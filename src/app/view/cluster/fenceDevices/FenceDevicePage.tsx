import { selectors } from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";

import * as task from "./task";
import { FenceDeviceDetailPage } from "./FenceDeviceDetailPage";
import { FenceDeviceList } from "./list";

export const FenceDevicePage = () => {
  const [{ fenceDeviceList }] = useClusterSelector(selectors.getCluster);
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
          },
        ]}
      />
      <GroupDetailView
        detailCard={<FenceDeviceDetailPage />}
        groupCard={<FenceDeviceList fenceDeviceList={fenceDeviceList} />}
      />
    </>
  );
};
