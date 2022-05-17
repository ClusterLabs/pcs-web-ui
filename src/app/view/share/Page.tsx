import React from "react";
import { NotificationBadge, Page as PfPage } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors } from "app/store";

import { BackgroundImage } from "./BackgroundImage";
import { PageHeader } from "./PageHeader";
import { Drawer } from "./Drawer";

export const Page = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const notifications = useSelector(selectors.getDrawerNotifications);
  const unreadErrorNotifsCount = notifications.filter(
    n => n.isRead === false && n.severity === "ERROR",
  ).length;

  return (
    <>
      <BackgroundImage />
      <PfPage
        header={
          <PageHeader
            notificationBadge={
              <NotificationBadge
                variant={
                  notifications.find(n => n.isRead === false)
                    ? unreadErrorNotifsCount > 0
                      ? "attention"
                      : "unread"
                    : "read"
                }
                count={unreadErrorNotifsCount}
                onClick={() => setDrawerOpen(!isDrawerOpen)}
                aria-label="notifications"
              />
            }
          />
        }
        notificationDrawer={<Drawer />}
        isNotificationDrawerExpanded={isDrawerOpen}
      >
        {children}
      </PfPage>
    </>
  );
};
