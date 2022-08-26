import { NotificationBadge as PfNotificationBadge } from "@patternfly/react-core";

import { selectors } from "app/store";

export const NotificationBadge = ({
  notifications,
  switchDrawer,
}: {
  notifications: ReturnType<typeof selectors.getDrawerNotifications>;
  switchDrawer: () => void;
}) => {
  const unreadErrorCount = notifications.filter(
    n => !n.isRead && n.severity === "ERROR",
  ).length;

  return (
    <PfNotificationBadge
      variant={
        notifications.some(n => !n.isRead)
          ? unreadErrorCount > 0
            ? "attention"
            : "unread"
          : "read"
      }
      count={unreadErrorCount}
      onClick={switchDrawer}
      aria-label="Notifications"
      data-test="notification-badge"
    />
  );
};
