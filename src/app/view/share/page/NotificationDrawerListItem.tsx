import {
  Button,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  NotificationDrawerListItem as PfNotificationDrawerListItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

import { selectors } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";
import {
  NotificationDescription,
  severityToVariant,
} from "app/view/notifications";

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

export const NotificationDrawerListItem = ({
  notification,
}: {
  notification: ReturnType<typeof selectors.getDrawerNotifications>[number];
}) => {
  const dispatch = useDispatch();
  const severityVariant = severityToVariant(notification.severity);

  return (
    <PfNotificationDrawerListItem
      variant={severityVariant}
      data-test={
        notification.description
          ? `notification-${severityVariant}-${notification.description}`
          : `notification-${severityVariant}`
      }
      onClick={() =>
        dispatch({
          type: "NOTIFICATION.READ",
          payload: { id: notification.id },
        })
      }
      isRead={notification.isRead}
    >
      <NotificationDrawerListItemHeader
        variant={severityVariant}
        title={notification.message}
        srTitle="Info notification:"
      >
        <Button
          data-test={`destroy-${notification.description}`}
          variant="plain"
          onClick={() =>
            dispatch({
              type: "NOTIFICATION.DESTROY",
              payload: { id: notification.id },
            })
          }
        >
          <TimesIcon />
        </Button>
      </NotificationDrawerListItemHeader>
      <NotificationDrawerListItemBody
        timestamp={getTimeStamp(notification.creationTime)}
      >
        <NotificationDescription details={notification.details} />
      </NotificationDrawerListItemBody>
    </PfNotificationDrawerListItem>
  );
};
