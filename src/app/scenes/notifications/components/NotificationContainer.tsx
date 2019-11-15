import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

import { Action } from "app/common/actions";
import { Notification } from "../types";
import * as selectors from "../selectors";

const severityToVariant = (severity: Notification["severity"]) => {
  switch (severity) {
    case "SUCCESS": return "success";
    case "ERROR": return "danger";
    default: return "info";
  }
};

const NotificationContainer = () => {
  const notifications = useSelector(selectors.getNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications.map(({ id, severity, message }) => (
        <li className="notification-item" key={id}>
          <Alert
            variant={severityToVariant(severity)}
            action={(
              <AlertActionCloseButton
                onClose={() => dispatch<Action>({
                  type: "NOTIFICATION.DESTROY",
                  payload: { id },
                })}
              />
            )}
            title={message}
          />
        </li>
      ))}
    </ul>
  );
};

export default NotificationContainer;
