import {
  ActionList,
  ActionListItem,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { push } from "connected-react-router";

import { join } from "app/view/share";

import { AddClusterPage } from "./addCluster";
import {
  ClusterSetup,
  useTask as useTaskClusterSetup,
} from "./task/clusterSetup";

export const DashboardToolbar = ({ urlPrefix }: { urlPrefix: string }) => {
  const dispatch = useDispatch();
  const toDashboard = () => dispatch(push(urlPrefix));

  const addClusterUrl = join(urlPrefix, "add-cluster");
  const addCluster = useRouteMatch({ exact: true, path: addClusterUrl });
  const { open: openClusterSetup } = useTaskClusterSetup();
  return (
    <Toolbar data-test="dashboard-toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <ActionList>
            <ActionListItem>
              <Button
                variant="primary"
                onClick={() => dispatch(push(addClusterUrl))}
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
          {addCluster && <AddClusterPage onClose={toDashboard} />}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
