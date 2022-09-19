import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { LauncherDropdown } from "./LauncherDropdown";
import { LauncherToolbarButtonGroup } from "./LauncherToolbarButtonGroup";
import { LauncherItem } from "./types";
import { tryFirstButtonPrimary } from "./tools";

export const LaunchersToolbar = <ARGS extends unknown[] = []>({
  toolbarName,
  buttonsItems = [],
  dropdownItems = [],
}: {
  toolbarName: string;
  buttonsItems?: LauncherItem<ARGS>[];
  dropdownItems?: LauncherItem<ARGS>[];
}) => {
  return (
    <Toolbar style={{ padding: "0" }}>
      <ToolbarContent style={{ padding: "0" }}>
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
