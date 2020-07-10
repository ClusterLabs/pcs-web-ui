import { Reducer } from "redux";

import { types } from "app/store";
import { Action } from "app/store/actions";

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
