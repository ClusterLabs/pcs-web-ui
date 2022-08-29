import React from "react";
import {
  PageHeader,
  PageHeaderTools,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { useLocation } from "app/view/share/router";
import * as location from "app/view/share/location";

import { UserMenu } from "./UserMenu";

export const Header = ({
  notificationBadge,
}: {
  notificationBadge: React.ReactNode;
}) => {
  const { navigate } = useLocation();
  return (
    <PageHeader
      logo="HA Cluster Management"
      headerTools={
        <PageHeaderTools>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarItem>{notificationBadge}</ToolbarItem>

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
    />
  );
};
