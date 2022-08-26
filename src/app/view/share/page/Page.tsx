import React from "react";
import { PageHeaderTools, Page as PfPage } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { NotificationBadge, NotificationDrawer } from "app/view/share";

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
          <NotificationDrawer
            notifications={notifications}
            closeDrawer={() => setDrawerOpen(!isDrawerOpen)}
          />
        }
        isNotificationDrawerExpanded={isDrawerOpen}
      >
        {children}
      </PfPage>
    </>
  );
};
