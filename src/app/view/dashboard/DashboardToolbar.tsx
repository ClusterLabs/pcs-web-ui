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

export const DashboardToolbar = () => {
  const { navigate } = useLocation();

  const addCluster = useRoute("/add-cluster");
  const { open: openClusterSetup } = useTaskClusterSetup();
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
          <ClusterSetup />
          {addCluster && (
            <AddClusterPage onClose={() => navigate(location.dashboard)} />
          )}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
