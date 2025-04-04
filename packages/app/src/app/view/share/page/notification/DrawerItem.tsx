import {
  Button,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  NotificationDrawerListItem as PfNotificationDrawerListItem,
} from "@patternfly/react-core";
import {TimesIcon} from "@patternfly/react-icons";

import {testMarks} from "app/view/dataTest";
import {useDispatch} from "app/view/share/useDispatch";

import type {Notification} from "./types";
import {severityToVariant} from "./severityToVariant";
import {Description} from "./Description";

const getTimeStamp = (creationTime: Date) => {
  const secElapsed = Math.floor((Date.now() - creationTime.getTime()) / 1000);

  if (secElapsed < 60) {
    return `${secElapsed} ${secElapsed === 1 ? "second" : "seconds"} ago`;
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

const {success, info, error} = testMarks.notifications.drawer;

export const DrawerItem = ({notification}: {notification: Notification}) => {
  const dispatch = useDispatch();
  const severityVariant = severityToVariant(notification.severity);
  const typeMark =
    notification.severity === "SUCCESS"
      ? success
      : notification.severity === "INFO"
        ? info
        : error;

  return (
    <PfNotificationDrawerListItem
      {...typeMark.mark}
      variant={severityVariant}
      onClick={() =>
        dispatch({
          type: "NOTIFICATION.READ",
          payload: {id: notification.id},
        })
      }
      isRead={notification.isRead}
    >
      <NotificationDrawerListItemHeader
        {...typeMark.message.mark}
        variant={severityVariant}
        title={notification.message}
        srTitle="Info notification:"
      >
        <Button
          {...typeMark.destroy.mark}
          variant="plain"
          onClick={() =>
            dispatch({
              type: "NOTIFICATION.DESTROY",
              payload: {id: notification.id},
            })
          }
        >
          <TimesIcon />
        </Button>
      </NotificationDrawerListItemHeader>
      <NotificationDrawerListItemBody
        timestamp={getTimeStamp(notification.creationTime)}
      >
        <Description details={notification.details} />
      </NotificationDrawerListItemBody>
    </PfNotificationDrawerListItem>
  );
};
