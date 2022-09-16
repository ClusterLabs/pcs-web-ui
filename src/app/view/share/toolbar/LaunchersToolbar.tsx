import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { LauncherDropdown } from "app/view/share/toolbar";
import { LauncherToolbarButtonGroup } from "app/view/share/toolbar";
import { LauncherItem } from "app/view/share/toolbar/types";

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
              items={buttonsItems.map((item, i) =>
                i > 0 || item?.button?.variant
                  ? item
                  : { ...item, button: { variant: "primary" } },
              )}
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
