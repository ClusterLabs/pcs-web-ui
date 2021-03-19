import React from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  AlertActionCloseButton,
  List,
  ListItem,
  Text,
} from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { useDispatch } from "app/view";

const severityToVariant = (
  severity: types.notifications.Notification["severity"],
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

const WithList: React.FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <>
      <Text component="p">{title}</Text>
      <List>
        {items.map((item, i) => (
          /* eslint-disable react/no-array-index-key */
          <ListItem key={i}>{item}</ListItem>
        ))}
      </List>
    </>
  );
};

export const Notifications = () => {
  const notifications = useSelector(selectors.getNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications.reverse().map(({ id, severity, message, details }) => (
        <li className="notification-item" key={id}>
          <Alert
            variant={severityToVariant(severity)}
            actionClose={
              <AlertActionCloseButton
                onClose={() =>
                  dispatch({
                    type: "NOTIFICATION.DESTROY",
                    payload: { id },
                  })
                }
              />
            }
            title={message}
          >
            {details && details.type === "LIST" && (
              <WithList title={details.title} items={details.items} />
            )}
            {details
              && details.type === "LINES"
              && details.lines.map((line, i) => <p key={i}>{line}</p>)}
          </Alert>
        </li>
      ))}
    </ul>
  );
};
