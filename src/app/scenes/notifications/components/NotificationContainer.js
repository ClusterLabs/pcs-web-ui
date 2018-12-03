import React from "react";
import { Alert } from "@patternfly/react-core";

import * as msgTypes from "../msgTypes";

const typeVariantMap = {
  [msgTypes.SUCCESS]: "success",
  [msgTypes.ERROR]: "danger",
  [msgTypes.INFO]: "info",
};

const NotificationContainer = ({ notifications, actions }) => (
  <ul id="notifications">
    {notifications.map(({ id, type, message }) => (
      <li className="notification-item" key={id}>
        <Alert
          variant={typeVariantMap[type]}
          onClose={() => actions.destroy(id)}
        >
          {message}
        </Alert>
      </li>
    ))}
  </ul>
);

export default NotificationContainer;
