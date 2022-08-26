import React from "react";
import {
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
  PageHeaderTools,
  Page as PfPage,
} from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors } from "app/store";

import { NotificationBadge } from "./NotificationBadge";
import { NotificationDrawerEmpty } from "./NotificationDrawerEmpty";
import { NotificationDrawerListItem } from "./NotificationDrawerListItem";
import { NotificationDrawerDropdown } from "./NotificationDrawerDropdown";
import { PageToolbar } from "./PageToolbar";
import { BackgroundImage } from "./BackgroundImage";
import { PageHeader } from "./PageHeader";

export const Page = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const notifications = useSelector(selectors.getDrawerNotifications);

  return (
    <>
      <BackgroundImage />
      <PfPage
        header={
          <PageHeader
            headerTools={
              <PageHeaderTools>
                <PageToolbar
                  notificationBadge={
                    <NotificationBadge
                      notifications={notifications}
                      switchDrawer={() => setDrawerOpen(!isDrawerOpen)}
                    />
                  }
                />
              </PageHeaderTools>
            }
          />
        }
        notificationDrawer={
          <NotificationDrawer>
            <NotificationDrawerHeader
              count={notifications.filter(n => !n.isRead).length}
              onClose={() => setDrawerOpen(false)}
            >
              <NotificationDrawerDropdown />
            </NotificationDrawerHeader>

            <NotificationDrawerBody>
              {notifications.map(n => (
                <NotificationDrawerListItem key={n.id} notification={n} />
              ))}
              {notifications.length === 0 && <NotificationDrawerEmpty />}
            </NotificationDrawerBody>
          </NotificationDrawer>
        }
        isNotificationDrawerExpanded={isDrawerOpen}
      >
        {children}
      </PfPage>
    </>
  );
};
