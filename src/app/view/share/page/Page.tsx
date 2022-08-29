import React from "react";
import { Page as PfPage } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors } from "app/store";

import * as Notification from "./notification";
import { BackgroundImage } from "./BackgroundImage";
import { Header } from "./Header";

export const Page = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const notificationList = useSelector(selectors.getNotifications);

  return (
    <>
      <BackgroundImage />
      <PfPage
        header={
          <Header
            notificationBadge={
              <Notification.Badge
                notificationList={notificationList}
                switchDrawer={() => setDrawerOpen(!isDrawerOpen)}
              />
            }
          />
        }
        notificationDrawer={
          <Notification.Drawer
            notificationList={notificationList}
            onClose={() => setDrawerOpen(false)}
          />
        }
        isNotificationDrawerExpanded={isDrawerOpen}
      >
        {children}
      </PfPage>
      <Notification.Toast notificationList={notificationList} />
    </>
  );
};
