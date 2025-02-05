import type React from "react";
import {
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

import type {Notification} from "./types";
import {DrawerDropdown} from "./DrawerDropdown";
import {DrawerEmpty} from "./DrawerEmpty";
import {DrawerItem} from "./DrawerItem";

type DrawerProps = React.ComponentProps<typeof NotificationDrawerHeader>;

export const Drawer = ({
  notificationList,
  onClose,
}: {
  notificationList: Notification[];
  onClose: DrawerProps["onClose"];
}) => {
  return (
    <NotificationDrawer {...testMarks.notifications.drawer.mark}>
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
