import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { NotificationSeverity } from "../types";
import { selectors } from "../plugin";
import * as NotificationActionCreator from "../actionCreators";

const severityVariantMap = {
  [NotificationSeverity.SUCCESS]: "success",
  [NotificationSeverity.ERROR]: "danger",
  [NotificationSeverity.INFO]: "info",
};

const NotificationContainer = () => {
  const notifications = useSelector(selectors.getNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications.map(({ id, severity, message }) => (
        <li className="notification-item" key={id}>
          <Alert
            variant={severityVariantMap[severity]}
            onClose={() => dispatch(NotificationActionCreator.destroy(id))}
            title={message}
          />
        </li>
      ))}
    </ul>
  );
};

export default NotificationContainer;
