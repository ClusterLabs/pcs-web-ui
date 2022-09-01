import { ActionList } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
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
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.create.FenceDeviceCreate}
            useTask={task.create.useTask}
            label="Create Fence Device"
          />
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        detailCard={<FenceDeviceDetailPage />}
        groupCard={<FenceDeviceList fenceDeviceList={fenceDeviceList} />}
      />
    </>
  );
};
