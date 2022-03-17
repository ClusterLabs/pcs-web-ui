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
    React.ReactNode | { run: () => void; "data-test": string }
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
            {Object.entries(actionMap).map(([label, action]) =>
              action !== null
              && action !== undefined
              && typeof action === "object"
              && "run" in action ? (
                <Button
                  key={label}
                  onClick={action.run}
                  data-test={action["data-test"]}
                >
                  {label}
                </Button>
              ) : (
                action
              ),
            )}
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
