import { Reducer } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

const notifications: Reducer<types.notifications.NotificationState, Action> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "NOTIFICATION.CREATE":
      return [...state, action.payload.notification];
    case "NOTIFICATION.DESTROY":
      return state.filter(n => n.id !== action.payload.id);
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

export default notifications;
