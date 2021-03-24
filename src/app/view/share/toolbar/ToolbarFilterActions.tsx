import React from "react";
import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

export const ToolbarFilterAction = ({
  children,
  clearAllFilters,
  actions = {},
}: React.PropsWithChildren<{
  clearAllFilters: () => void;
  actions?: Record<string, () => void>;
}>) => {
  return (
    <Toolbar
      className="pf-m-toggle-group-container"
      clearAllFilters={clearAllFilters}
    >
      <ToolbarContent>
        <ToolbarGroup variant="filter-group">{children}</ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem>
            {Object.keys(actions).map(label => (
              <Button key={label} onClick={actions[label]}>
                {label}
              </Button>
            ))}
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
