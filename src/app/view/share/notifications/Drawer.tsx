import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerList,
  NotificationDrawerListItem,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  Title,
} from "@patternfly/react-core";
import { SearchIcon, TimesIcon } from "@patternfly/react-icons";
import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";

import {
  NotificationDescription,
  severityToVariant,
} from "../../notifications";
import { useDispatch } from "../useDispatch";

const getTimeStamp = (creationTime: Date) => {
  const secElapsed = Math.floor((Date.now() - creationTime.getTime()) / 1000);

  if (secElapsed < 60) {
    return `${secElapsed} ${secElapsed === 1 ? "second" : "secondes"} ago`;
  }
  if (secElapsed < 60 * 60) {
    return `${Math.floor(secElapsed / 60)} ${
      Math.floor(secElapsed / 60) === 1 ? "minute" : "minutes"
    } ago`;
  }

  return new Date(
    Math.floor(creationTime.getTime() / 1000) * 1e3,
  ).toLocaleString();
};

export const Drawer = ({
  notificationDrawerHeader,
}: {
  notificationDrawerHeader: React.ReactNode;
}) => {
  const notifications = useSelector(selectors.getDrawerNotifications);
  const dispatch = useDispatch();

  notifications.sort(function (x, y) {
    return y.id - x.id;
  });

  return (
    <NotificationDrawer>
      {notificationDrawerHeader}

      <NotificationDrawerBody>
        {notifications.length > 0 ? (
          <>
            <NotificationDrawerList>
              {notifications.map(
                ({ id, severity, message, creationTime, details, isRead }) => (
                  <NotificationDrawerListItem
                    key={id}
                    variant={severityToVariant(severity)}
                    onClick={() =>
                      dispatch({
                        type: "NOTIFICATION.READ",
                        payload: { id },
                      })
                    }
                    isRead={isRead}
                  >
                    <NotificationDrawerListItemHeader
                      variant={severityToVariant(severity)}
                      title={message}
                      srTitle="Info notification:"
                    >
                      <Button
                        variant="plain"
                        onClick={() =>
                          dispatch({
                            type: "NOTIFICATION.DESTROY",
                            payload: { id },
                          })
                        }
                      >
                        <TimesIcon />
                      </Button>
                    </NotificationDrawerListItemHeader>
                    <NotificationDrawerListItemBody
                      timestamp={getTimeStamp(creationTime)}
                    >
                      <NotificationDescription details={details} />
                    </NotificationDrawerListItemBody>
                  </NotificationDrawerListItem>
                ),
              )}
            </NotificationDrawerList>
          </>
        ) : (
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={SearchIcon} />
            <Title headingLevel="h2" size="lg">
              No alerts found
            </Title>
            <EmptyStateBody>There are currently no alerts.</EmptyStateBody>
          </EmptyState>
        )}
      </NotificationDrawerBody>
    </NotificationDrawer>
  );
};
