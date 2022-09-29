import React from "react";
import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { LauncherDropdown } from "./LauncherDropdown";
import { LauncherToolbarButtonGroup } from "./LauncherToolbarButtonGroup";
import { LauncherItem } from "./types";
import { tryFirstButtonPrimary } from "./tools";

export const LaunchersToolbar = ({
  toolbarName,
  buttonsItems = [],
  dropdownItems = [],
  before,
}: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdownItems?: LauncherItem[];
  before?: React.ReactNode;
}) => {
  return (
    <Toolbar style={{ padding: "0" }}>
      <ToolbarContent style={{ padding: "0" }}>
        {before}
        {buttonsItems.length > 0 && (
          <ToolbarItem>
            <LauncherToolbarButtonGroup
              items={tryFirstButtonPrimary(buttonsItems)}
              toolbarName={toolbarName}
            />
          </ToolbarItem>
        )}
        {dropdownItems.length > 0 && (
          <ToolbarItem>
            <LauncherDropdown
              items={dropdownItems}
              dropdownName={toolbarName}
            />
          </ToolbarItem>
        )}
      </ToolbarContent>
    </Toolbar>
  );
};
