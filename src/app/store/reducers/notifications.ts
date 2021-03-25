import { ActionPayload } from "app/store/actions";

import { Reducer } from "./tools";

export type Notification = ActionPayload["NOTIFICATION.CREATE"];
export type NotificationState = Notification[];

const notifications: Reducer<NotificationState> = (state = [], action) => {
  switch (action.type) {
    case "NOTIFICATION.CREATE":
      return [...state, action.payload];
    case "NOTIFICATION.DESTROY":
      return state.filter(n => n.id !== action.payload.id);
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

export default notifications;
