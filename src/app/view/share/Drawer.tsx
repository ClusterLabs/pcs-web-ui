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
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
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

import { NotificationDescription, severityToVariant } from "../notifications";

import { useDispatch } from "./useDispatch";

/*
const notificationDrawerActions = [
  <DropdownItem key="markAllRead" onClick={undefined} component="button">
    Mark all read
  </DropdownItem>,
  <DropdownItem key="clearAll" onClick={undefined} component="button">
    Clear all
  </DropdownItem>,
  <DropdownItem key="unclearLast" onClick={undefined} component="button">
    Unclear last
  </DropdownItem>,
  <DropdownItem key="settings" component="button">
    Settings
  </DropdownItem>,
];
*/

export const Drawer = () => {
  const notifications = useSelector(selectors.getDrawerNotifications);
  const [isHeaderDropdownOpen, setHeaderDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <NotificationDrawer>
      <NotificationDrawerHeader
      //count={}
      //onClose={}
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
              {notifications
                .reverse()
                .map(({ id, severity, message, details }) => (
                  <NotificationDrawerListItem
                    key={id}
                    variant={severityToVariant(severity)}
                    onClick={undefined}
                    isRead={undefined}
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
                    //timestamp="5 minutes ago"
                    >
                      <NotificationDescription details={details} />
                    </NotificationDrawerListItemBody>
                  </NotificationDrawerListItem>
                ))}
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
