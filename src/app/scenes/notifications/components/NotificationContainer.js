import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@patternfly/react-core";

import * as msgTypes from "../msgTypes";
import { selectors } from "../plugin";
import * as actions from "../actions";

const typeVariantMap = {
  [msgTypes.SUCCESS]: "success",
  [msgTypes.ERROR]: "danger",
  [msgTypes.INFO]: "info",
};

const NotificationContainer = () => {
  const notifications = useSelector(selectors.getNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications.map(({ id, type, message }) => (
        <li className="notification-item" key={id}>
          <Alert
            variant={typeVariantMap[type]}
            onClose={() => dispatch(actions.destroy(id))}
            title={message}
          />
        </li>
      ))}
    </ul>
  );
};

export default NotificationContainer;
