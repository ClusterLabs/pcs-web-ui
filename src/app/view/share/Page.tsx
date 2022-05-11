import React from "react";
import { NotificationBadge, Page as PfPage } from "@patternfly/react-core";

import { BackgroundImage } from "./BackgroundImage";
import { PageHeader } from "./PageHeader";
import { Drawer } from "./Drawer";

export const Page = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <BackgroundImage />
      <PfPage
        header={
          <PageHeader
            notificationBadge={
              <NotificationBadge
                //variant={}
                //count={}
                onClick={() => setDrawerOpen(!isDrawerOpen)}
                aria-label="notifications"
              />
            }
          />
        }
        notificationDrawer={<Drawer />}
        isNotificationDrawerExpanded={isDrawerOpen}
        //onNotificationDrawerExpand={}
      >
        {children}
      </PfPage>
    </>
  );
};
