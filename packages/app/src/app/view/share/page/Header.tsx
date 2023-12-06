import React from "react";
import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  Toolbar,
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
        <MastheadContent>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarItem>
                <UserMenu />
              </ToolbarItem>
            </ToolbarGroup>
          </Toolbar>
        </MastheadContent>
      </MastheadMain>
    </Masthead>
  );
};
