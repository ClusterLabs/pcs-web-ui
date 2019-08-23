import React from "react";
import {
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const DashboardToolbar = () => {
  const dispatch = useDispatch();
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Button
            variant="primary"
            onClick={() => dispatch(push("/add-cluster"))}
            data-role="add-cluster"
          >
            Add existing cluster
          </Button>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default DashboardToolbar;
