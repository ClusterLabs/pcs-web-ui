import React from "react";
import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

import { selectors, types, useDispatch, useSelector } from "app/store";

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

export const Notifications = () => {
  const notifications = useSelector(selectors.getNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications.reverse().map(({ id, severity, message }) => (
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
          />
        </li>
      ))}
    </ul>
  );
};
