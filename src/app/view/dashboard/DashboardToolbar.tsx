import {
  ActionList,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { ActionTaskLauncher } from "app/view/share";

import * as task from "./task";

export const DashboardToolbar = () => {
  return (
    <Toolbar data-test="dashboard-toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <ActionList>
            <ActionTaskLauncher
              taskComponent={task.importExistingCluster.ImportExistingCluster}
              useTask={task.importExistingCluster.useTask}
              label="Add existing cluster"
              data-test="import-existing-cluster"
            />

            <ActionTaskLauncher
              taskComponent={task.clusterSetup.ClusterSetup}
              useTask={task.clusterSetup.useTask}
              label="Setup cluster"
              variant="secondary"
              data-test="setup-cluster"
            />
          </ActionList>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
