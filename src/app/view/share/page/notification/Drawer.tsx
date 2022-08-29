import React from "react";
import {
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
} from "@patternfly/react-core";

import { Notification } from "./types";
import { DrawerDropdown } from "./DrawerDropdown";
import { DrawerEmpty } from "./DrawerEmpty";
import { DrawerItem } from "./DrawerItem";

type DrawerProps = React.ComponentProps<typeof NotificationDrawerHeader>;

export const Drawer = ({
  notificationList,
  onClose,
}: {
  notificationList: Notification[];
  onClose: DrawerProps["onClose"];
}) => {
  return (
    <NotificationDrawer>
      <NotificationDrawerHeader
        count={notificationList.filter(n => !n.isRead).length}
        onClose={onClose}
      >
        <DrawerDropdown />
      </NotificationDrawerHeader>

      <NotificationDrawerBody>
        {notificationList.map(n => (
          <DrawerItem key={n.id} notification={n} />
        ))}
        {notificationList.length === 0 && <DrawerEmpty />}
      </NotificationDrawerBody>
    </NotificationDrawer>
  );
};
