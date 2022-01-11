import React from "react";
import {
  ActionList,
  ActionListItem,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { location, useLocation, useRoute } from "app/view/share";

import { AddClusterPage } from "./addCluster";
import {
  ClusterSetup,
  useTask as useTaskClusterSetup,
} from "./task/clusterSetup";
import {
  ImportExistingCluster,
  useTask as useTaskImportExistingCluster,
} from "./task/importExistingCluster";

export const DashboardToolbar = () => {
  const { navigate } = useLocation();

  const addCluster = useRoute("/add-cluster");
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
                onClick={() => navigate(location.dashboardAddCluster)}
                data-test="add-cluster"
              >
                Add existing cluster
              </Button>
            </ActionListItem>
            <ActionListItem></ActionListItem>
            <Button
              variant="primary"
              onClick={openAddExistingCluster}
              data-test="import-existing-cluster"
            >
              Add existing cluster
            </Button>
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
          {addCluster && (
            <AddClusterPage onClose={() => navigate(location.dashboard)} />
          )}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
