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
  actions: actionMap = {},
}: React.PropsWithChildren<{
  clearAllFilters: () => void;
  actions?: Record<
    string,
    (() => void) | { run: () => void; "data-test": string }
  >;
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
            {Object.entries(actionMap).map(([label, action]) => (
              <Button
                key={label}
                onClick={"run" in action ? action.run : action}
                {...("data-test" in action
                  ? { "data-test": action["data-test"] }
                  : {})}
              >
                {label}
              </Button>
            ))}
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
