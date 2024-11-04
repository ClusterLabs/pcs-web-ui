import {NotificationBadge as PfNotificationBadge} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

import {Notification} from "./types";

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

  return (
    <>
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
      />
      <span onClick={switchDrawer} style={{cursor: "pointer"}}>
        Notifications
      </span>
    </>
  );
};
