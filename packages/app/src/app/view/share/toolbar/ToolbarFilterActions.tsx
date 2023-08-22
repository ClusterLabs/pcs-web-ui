import React from "react";
import {
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import {LauncherItem} from "./types";
import {LauncherToolbarButtonGroup} from "./LauncherToolbarButtonGroup";
import {tryFirstButtonPrimary} from "./tools";

export const ToolbarFilterAction = ({
  children,
  clearAllFilters,
  buttonsItems,
}: React.PropsWithChildren<{
  clearAllFilters: () => void;
  buttonsItems?: LauncherItem[];
}>) => {
  return (
    <Toolbar
      className="pf-m-toggle-group-container"
      clearAllFilters={clearAllFilters}
    >
      <ToolbarContent>
        <ToolbarGroup variant="filter-group">{children}</ToolbarGroup>
        <ToolbarGroup>
          {buttonsItems && (
            <ToolbarItem>
              <LauncherToolbarButtonGroup
                items={tryFirstButtonPrimary(buttonsItems)}
              />
            </ToolbarItem>
          )}
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
