import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  KebabToggle,
  NotificationDrawerBody,
  NotificationDrawerHeader,
  NotificationDrawerList,
  NotificationDrawerListItem,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  NotificationDrawer as PfNotificationDrawer,
  Title,
} from "@patternfly/react-core";
import React from "react";
import { SearchIcon, TimesIcon } from "@patternfly/react-icons";

import { selectors } from "app/store";
import {
  NotificationDescription,
  severityToVariant,
} from "app/view/notifications";

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

export const NotificationDrawer = ({
  notifications,
  closeDrawer,
}: {
  notifications: ReturnType<typeof selectors.getDrawerNotifications>;
  closeDrawer: () => void;
}) => {
  const [isHeaderDropdownOpen, setHeaderDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();

  notifications.sort(function (x, y) {
    return y.id - x.id;
  });

  return (
    <PfNotificationDrawer>
      <NotificationDrawerHeader
        count={notifications.filter(n => n.isRead === false).length}
        onClose={closeDrawer}
      >
        <Dropdown
          onSelect={() => setHeaderDropdownOpen(!isHeaderDropdownOpen)}
          toggle={
            <KebabToggle
              onToggle={() => setHeaderDropdownOpen(!isHeaderDropdownOpen)}
              id="notification-toggle"
            />
          }
          isOpen={isHeaderDropdownOpen}
          isPlain
          dropdownItems={[
            <DropdownItem
              key="markAllRead"
              onClick={() => dispatch({ type: "NOTIFICATION.READ.ALL" })}
            >
              Mark all read
            </DropdownItem>,

            <DropdownItem
              key="clearAll"
              onClick={() => dispatch({ type: "NOTIFICATION.DESTROY.ALL" })}
            >
              Clear all
            </DropdownItem>,
          ]}
          id="notification-dropdown"
          position={DropdownPosition.right}
        />
      </NotificationDrawerHeader>

      <NotificationDrawerBody>
        {notifications.length > 0 ? (
          <>
            <NotificationDrawerList>
              {notifications.map(
                ({
                  id,
                  severity,
                  message,
                  creationTime,
                  details,
                  isRead,
                  description,
                }) => (
                  <NotificationDrawerListItem
                    key={id}
                    variant={severityToVariant(severity)}
                    data-test={
                      description
                        ? `notification-${severityToVariant(
                            severity,
                          )}-${description}`
                        : `notification-${severityToVariant(severity)}`
                    }
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
                        data-test={`destroy-${description}`}
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
          <EmptyState
            variant={EmptyStateVariant.full}
            data-test={"drawer-empty"}
          >
            <EmptyStateIcon icon={SearchIcon} />
            <Title headingLevel="h2" size="lg">
              No alerts found
            </Title>
            <EmptyStateBody>There are currently no alerts.</EmptyStateBody>
          </EmptyState>
        )}
      </NotificationDrawerBody>
    </PfNotificationDrawer>
  );
};
