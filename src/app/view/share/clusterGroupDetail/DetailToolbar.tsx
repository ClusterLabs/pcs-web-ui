import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";

import { LauncherDropdown } from "app/view/share/toolbar";
import { LauncherToolbarButtonGroup } from "app/view/share/toolbar";
import { LauncherItem } from "app/view/share/toolbar/types";

import { DetailLayoutClose } from "./DetailLayoutClose";

export const DetailToolbar = <ARGS extends unknown[] = []>({
  toolbarName,
  buttonsItems = [],
  dropdownItems = [],
}: {
  toolbarName: string;
  buttonsItems?: LauncherItem<ARGS>[];
  dropdownItems?: LauncherItem<ARGS>[];
}) => {
  return (
    <Toolbar id="group-detail-layout-detail-toolbar">
      <ToolbarContent>
        {buttonsItems.length > 0 && (
          <ToolbarItem>
            <LauncherToolbarButtonGroup
              items={buttonsItems}
              toolbarName={toolbarName}
            />
          </ToolbarItem>
        )}
        {dropdownItems.length > 0 && (
          <ToolbarItem>
            <LauncherDropdown items={dropdownItems} toolbarName={toolbarName} />
          </ToolbarItem>
        )}
        <ToolbarItem>
          <DetailLayoutClose />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
