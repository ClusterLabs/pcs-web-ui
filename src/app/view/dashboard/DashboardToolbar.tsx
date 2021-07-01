import {
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

export const DashboardToolbar = ({ urlPrefix }: { urlPrefix: string }) => {
  const dispatch = useDispatch();
  const toDashboard = () => dispatch(push(urlPrefix));

  const addClusterUrl = join(urlPrefix, "add-cluster");
  const addCluster = useRouteMatch({ exact: true, path: addClusterUrl });
  return (
    <Toolbar data-test="dashboard-toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <Button
            variant="primary"
            onClick={() => dispatch(push(addClusterUrl))}
            data-test="add-cluster"
          >
            Add existing cluster
          </Button>
          {addCluster && <AddClusterPage onClose={toDashboard} />}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
