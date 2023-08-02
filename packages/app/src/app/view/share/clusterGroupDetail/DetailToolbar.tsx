import React from "react";
import {Toolbar, ToolbarContent, ToolbarItem} from "@patternfly/react-core";

import {LauncherToolbarButtonGroup} from "app/view/share/toolbar";
import {LauncherItem} from "app/view/share/toolbar/types";

import {DetailLayoutClose} from "./DetailLayoutClose";

export const DetailToolbar = (props: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdown?: React.ReactNode;
  "data-test"?: string;
}) => {
  const {toolbarName, buttonsItems, dropdown} = props;
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
        {dropdown && <ToolbarItem>{props.dropdown}</ToolbarItem>}
        <ToolbarItem>
          <DetailLayoutClose />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
