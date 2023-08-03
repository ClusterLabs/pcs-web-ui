import React from "react";
import {Toolbar, ToolbarContent, ToolbarItem} from "@patternfly/react-core";

import {LauncherToolbarButtonGroup} from "./LauncherToolbarButtonGroup";
import {LauncherItem} from "./types";
import {tryFirstButtonPrimary} from "./tools";

export const LaunchersToolbar = ({
  toolbarName,
  buttonsItems = [],
  dropdown,
  before,
  after,
  "data-test": dataTest,
}: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdown?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <Toolbar style={{padding: "0"}} data-test={dataTest}>
      <ToolbarContent style={{padding: "0"}}>
        {before}
        {buttonsItems.length > 0 && (
          <ToolbarItem>
            <LauncherToolbarButtonGroup
              items={tryFirstButtonPrimary(buttonsItems)}
              toolbarName={toolbarName}
            />
          </ToolbarItem>
        )}
        {dropdown && <ToolbarItem>{dropdown}</ToolbarItem>}
        {after}
      </ToolbarContent>
    </Toolbar>
  );
};
