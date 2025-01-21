import {NotificationBadge as PfNotificationBadge} from "@patternfly/react-core";
import {AttentionBellIcon, BellIcon} from "@patternfly/react-icons";

import {testMarks} from "app/view/dataTest";

import type {Notification} from "./types";

export const Badge = ({
  notificationList,
  switchDrawer,
}: {
  notificationList: Notification[];
  switchDrawer: () => void;
}) => {
  const unreadErrorCount = notificationList.filter(
    n => !n.isRead && n.severity === "ERROR",
  ).length;

  const icon = unreadErrorCount > 0 ? <AttentionBellIcon /> : <BellIcon />;

  return (
    <PfNotificationBadge
      variant={
        notificationList.some(n => !n.isRead)
          ? unreadErrorCount > 0
            ? "attention"
            : "unread"
          : "read"
      }
      count={unreadErrorCount}
      onClick={switchDrawer}
      aria-label="Notifications"
      {...testMarks.notifications.badge.mark}
    >
      {icon} Notifications
    </PfNotificationBadge>
  );
};
