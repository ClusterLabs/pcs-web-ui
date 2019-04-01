import React from "react";
import {
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { connect } from "react-redux";
import { push } from "connected-react-router";

const withPushLocations = connect(null, {
  addExistingCluster: () => push("/add-cluster"),
});

const DashboardToolbar = ({ addExistingCluster }) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarItem>
        <Button
          variant="primary"
          onClick={addExistingCluster}
          data-role="add-cluster"
        >
          Add existing cluster
        </Button>
      </ToolbarItem>
    </ToolbarGroup>
  </Toolbar>
);

export default withPushLocations(DashboardToolbar);
