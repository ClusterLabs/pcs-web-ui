import { useSelector } from "react-redux";
import {
  Alert,
  AlertActionCloseButton,
  List,
  ListItem,
  Text,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { useDispatch } from "app/view/share";

export const severityToVariant = (
  severity: ReturnType<
    typeof selectors.getAlertNotifications
  >[number]["severity"],
) => {
  switch (severity) {
    case "SUCCESS":
      return "success";

    case "ERROR":
      return "danger";

    default:
      return "info";
  }
};

export const NotificationDescription = ({
  details,
}: {
  details: ReturnType<typeof selectors.getAlertNotifications>[number]["details"];
}) => {
  return (
    <>
      {details && details.type === "LIST" && details.items.length > 0 && (
        <>
          <Text component="p">{details.title}</Text>
          <List>
            {details.items.map((item, i) => (
              /* eslint-disable react/no-array-index-key */
              <ListItem key={i}>{item}</ListItem>
            ))}
          </List>
        </>
      )}
      {details
        && details.type === "LINES"
        && details.lines.map((line, i) => <p key={i}>{line}</p>)}
    </>
  );
};

export const Notifications = () => {
  const notifications = useSelector(selectors.getAlertNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications
        .reverse()
        .map(({ id, severity, message, details, description }) => {
          const variant = severityToVariant(severity);
          return (
            <li className="notification-item" key={id}>
              <Alert
                variant={variant}
                data-test={
                  description
                    ? `notification-${variant}-${description}`
                    : `notification-${variant}`
                }
                actionClose={
                  <AlertActionCloseButton
                    onClose={() =>
                      dispatch({
                        type: "NOTIFICATION.HIDE",
                        payload: { id },
                      })
                    }
                  />
                }
                title={message}
              >
                <NotificationDescription details={details} />
              </Alert>
            </li>
          );
        })}
    </ul>
  );
};
