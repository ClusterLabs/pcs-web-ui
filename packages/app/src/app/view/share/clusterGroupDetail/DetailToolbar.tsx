import {Toolbar, ToolbarContent, ToolbarItem} from "@patternfly/react-core";

import {LauncherDropdown} from "app/view/share/toolbar";
import {LauncherToolbarButtonGroup} from "app/view/share/toolbar";
import {LauncherItem} from "app/view/share/toolbar/types";

import {DetailLayoutClose} from "./DetailLayoutClose";

export const DetailToolbar = (props: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdownItems?: LauncherItem[];
  "data-test"?: string;
}) => {
  const {toolbarName, buttonsItems, dropdownItems} = props;
  return (
    <Toolbar
      id="group-detail-layout-detail-toolbar"
      data-test={props["data-test"]}
    >
      <ToolbarContent>
        {buttonsItems && buttonsItems.length > 0 && (
          <ToolbarItem>
            <LauncherToolbarButtonGroup
              items={buttonsItems}
              toolbarName={toolbarName}
            />
          </ToolbarItem>
        )}
        {dropdownItems && dropdownItems.length > 0 && (
          <ToolbarItem>
            <LauncherDropdown
              items={dropdownItems}
              dropdownName={toolbarName}
            />
          </ToolbarItem>
        )}
        <ToolbarItem>
          <DetailLayoutClose />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
