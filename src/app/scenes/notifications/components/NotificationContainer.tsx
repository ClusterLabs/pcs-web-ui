import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

import { NotificationSeverity } from "../types";
import * as selectors from "../selectors";
import * as NotificationActionCreator from "../actionCreators";

const severityToVariant = (severity: NotificationSeverity) => {
  switch (severity) {
    case NotificationSeverity.SUCCESS: return "success";
    case NotificationSeverity.ERROR: return "danger";
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
                onClose={() => dispatch(NotificationActionCreator.destroy(id))}
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
