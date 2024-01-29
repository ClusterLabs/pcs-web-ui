import React from "react";
import {Page as PfPage} from "@patternfly/react-core";
import {useSelector} from "react-redux";

import {selectors} from "app/store";

import * as Notification from "./notification";
import {Header} from "./Header";

const {showMasthead} = pcsUiEnvAdapter;

type NotificationList = ReturnType<typeof selectors.getNotifications>;

export const Page = ({
  children,
}: {
  children: (_notificationProps: {
    list: NotificationList;
    isDrawerOpen: boolean;
    setDrawerOpen: (_isDrawerOpen: boolean) => void;
  }) => React.ReactNode;
}) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const notificationList = useSelector(selectors.getNotifications);

  return (
    <>
      <PfPage
        header={showMasthead && <Header />}
        notificationDrawer={
          <Notification.Drawer
            notificationList={notificationList}
            onClose={() => setDrawerOpen(false)}
          />
        }
        isNotificationDrawerExpanded={isDrawerOpen}
      >
        {children({list: notificationList, isDrawerOpen, setDrawerOpen})}
      </PfPage>
      <Notification.Toast notificationList={notificationList} />
    </>
  );
};
