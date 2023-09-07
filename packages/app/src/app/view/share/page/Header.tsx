import React from "react";
import {
  PageHeader,
  PageHeaderTools,
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
    <PageHeader
      logo="HA Cluster Management"
      headerTools={
        <PageHeaderTools>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarItem>
                <UserMenu />
              </ToolbarItem>
            </ToolbarGroup>
          </Toolbar>
        </PageHeaderTools>
      }
      logoProps={{
        onClick: (e: React.SyntheticEvent) => {
          e.preventDefault();
          navigate(location.dashboard);
        },
      }}
      {...testMarks.header.mark}
    />
  );
};
