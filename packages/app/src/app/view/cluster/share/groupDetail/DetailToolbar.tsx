import type React from "react";
import {Toolbar, ToolbarContent, ToolbarItem} from "@patternfly/react-core";

import {LauncherToolbarButtonGroup} from "app/view/share/toolbar";
import type {LauncherItem} from "app/view/share/toolbar/types";

import {DetailLayoutClose} from "./DetailLayoutClose";

export const DetailToolbar = (props: {
  buttonsItems?: LauncherItem[];
  dropdown?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <Toolbar
      id="group-detail-layout-detail-toolbar"
      data-test={props["data-test"]}
    >
      <ToolbarContent>
        {props.buttonsItems && props.buttonsItems.length > 0 && (
          <ToolbarItem>
            <LauncherToolbarButtonGroup items={props.buttonsItems} />
          </ToolbarItem>
        )}
        {props.dropdown && <ToolbarItem>{props.dropdown}</ToolbarItem>}
        <ToolbarItem>
          <DetailLayoutClose />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
