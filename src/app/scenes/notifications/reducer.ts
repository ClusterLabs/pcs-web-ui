import { Reducer } from "redux";
import { AuthRequired, AUTH_REQUIRED } from "app/services/auth/constants";

import { NotificationActionType, Notification } from "./types";
import * as NotificationAction from "./actions";

const notifications: Reducer<Notification[]> = (
  state = [],
  action: (
    | NotificationAction.Create
    | NotificationAction.Destroy
    | AuthRequired
  ),
) => {
  switch (action.type) {
    case NotificationActionType.CREATE:
      return [...state, action.payload.notification];
    case NotificationActionType.DESTROY:
      return state.filter(n => n.id !== action.payload.id);
    case AUTH_REQUIRED: return [];
    default: return state;
  }
};

export default notifications;

export const getNotifications = (state: Notification[]) => state;
