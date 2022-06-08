import React from "react";
import { Toolbar, ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { UserMenu } from "./UserMenu";

export const PageToolbar = ({
  notificationBadge,
}: {
  notificationBadge: React.ReactNode;
}) => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>{notificationBadge}</ToolbarItem>

        <ToolbarItem>
          <UserMenu />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
