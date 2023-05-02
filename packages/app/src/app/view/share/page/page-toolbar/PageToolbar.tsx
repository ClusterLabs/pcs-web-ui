import React from "react";
import {Level, LevelItem, StackItem} from "@patternfly/react-core";

import {Badge, types} from "../notification";

export const PageToolbar = ({
  breadcrumbs,
  notifications,
}: {
  breadcrumbs: React.ReactNode;
  notifications: {
    list: types.Notification[];
    isDrawerOpen: boolean;
    setDrawerOpen: (_isDrawerOpen: boolean) => void;
  };
}) => {
  return (
    <StackItem>
      <Level>
        <LevelItem>{breadcrumbs}</LevelItem>

        <LevelItem>
          <Badge
            notificationList={notifications.list}
            switchDrawer={() =>
              notifications.setDrawerOpen(!notifications.isDrawerOpen)
            }
          />
        </LevelItem>
      </Level>
    </StackItem>
  );
};
