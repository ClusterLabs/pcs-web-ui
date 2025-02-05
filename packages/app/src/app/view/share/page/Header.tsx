import type React from "react";
import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {useLocation} from "app/view/share/router";
import * as location from "app/view/share/location";

import {UserMenu} from "./UserMenu";

export const Header = () => {
  const {navigate} = useLocation();
  return (
    <Masthead {...testMarks.header.mark}>
      <MastheadMain>
        <MastheadBrand
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            navigate(location.dashboard);
          }}
        >
          HA Cluster Management
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar isFullHeight isStatic>
          <ToolbarContent>
            <ToolbarGroup align={{default: "alignRight"}}>
              <ToolbarItem>
                <UserMenu />
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );
};
