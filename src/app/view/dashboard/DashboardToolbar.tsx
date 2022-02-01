import React from "react";
import {
  ActionList,
  ActionListItem,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import {
  ClusterSetup,
  useTask as useTaskClusterSetup,
} from "./task/clusterSetup";
import {
  ImportExistingCluster,
  useTask as useTaskImportExistingCluster,
} from "./task/importExistingCluster";

export const DashboardToolbar = () => {
  const { open: openClusterSetup } = useTaskClusterSetup();
  const { open: openAddExistingCluster } = useTaskImportExistingCluster();
  return (
    <Toolbar data-test="dashboard-toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <ActionList>
            <ActionListItem>
              <Button
                variant="primary"
                onClick={openAddExistingCluster}
                data-test="import-existing-cluster"
              >
                Add existing cluster
              </Button>
            </ActionListItem>

            <ActionListItem>
              <Button
                variant="secondary"
                onClick={openClusterSetup}
                data-test="setup-cluster"
              >
                Setup cluster
              </Button>
            </ActionListItem>
          </ActionList>

          <ImportExistingCluster />
          <ClusterSetup />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
