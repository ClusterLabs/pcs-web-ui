import { NotificationBadge as PfNotificationBadge } from "@patternfly/react-core";

import { selectors } from "app/store";

export const NotificationBadge = ({
  notifications,
  switchDrawer,
}: {
  notifications: ReturnType<typeof selectors.getDrawerNotifications>;
  switchDrawer: () => void;
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
      onClick={switchDrawer}
      aria-label="Notifications"
      data-test="notification-badge"
    />
  );
};
