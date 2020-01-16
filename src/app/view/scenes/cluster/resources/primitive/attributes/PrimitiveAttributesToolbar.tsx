import React from "react";
import {
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

const PrimitiveAttributesToolbar = ({ edit }: {edit: () => void}) => {
  return (
    <Toolbar className="pf-l-toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <Button onClick={edit}>Edit Attributes</Button>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default PrimitiveAttributesToolbar;
