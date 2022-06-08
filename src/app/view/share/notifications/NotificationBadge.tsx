import React from "react";
import { NotificationBadge as PfNotificationBadge } from "@patternfly/react-core";

import { selectors } from "app/store";

export const NotificationBadge = ({
  notifications,
  openDrawer,
}: {
  notifications: ReturnType<typeof selectors.getDrawerNotifications>;
  openDrawer: () => void;
}) => {
  const unreadErrorNotifsCount = notifications.filter(
    n => n.isRead === false && n.severity === "ERROR",
  ).length;

  return (
    <PfNotificationBadge
      variant={
        notifications.find(n => n.isRead === false)
          ? unreadErrorNotifsCount > 0
            ? "attention"
            : "unread"
          : "read"
      }
      count={unreadErrorNotifsCount}
      onClick={openDrawer}
      aria-label="Notifications"
      data-test="notification-badge"
    />
  );
};
