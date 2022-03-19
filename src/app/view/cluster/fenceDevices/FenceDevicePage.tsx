import React from "react";
import { ActionList } from "@patternfly/react-core";

import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";
import { selectors } from "app/store";

import * as task from "./task";
import { FenceDeviceDetailPage } from "./FenceDeviceDetailPage";
import { FenceDeviceList } from "./list";

export const FenceDevicePage: React.FC = () => {
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
