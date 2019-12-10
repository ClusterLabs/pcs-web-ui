import React from "react";
import {
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { push } from "connected-react-router";

import { join } from "app/view/utils";
import { AddClusterPage } from "app/scenes/dashboard-add-cluster";

const DashboardToolbar = ({ urlPrefix }: { urlPrefix: string }) => {
  const dispatch = useDispatch();
  const toDashboard = () => dispatch(push(urlPrefix));

  const addClusterUrl = join(urlPrefix, "add-cluster");
  const addCluster = useRouteMatch({ exact: true, path: addClusterUrl });
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Button
            variant="primary"
            onClick={() => dispatch(push(addClusterUrl))}
            data-role="add-cluster"
          >
            Add existing cluster
          </Button>
          {addCluster && <AddClusterPage onClose={toDashboard} />}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default DashboardToolbar;
