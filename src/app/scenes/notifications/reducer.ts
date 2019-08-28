import { Reducer } from "redux";
import * as AuthAction from "app/services/auth/actions";

import { NotificationActionType, NotificationState } from "./types";
import * as NotificationAction from "./actions";

const notifications: Reducer<NotificationState, (
    | NotificationAction.Create
    | NotificationAction.Destroy
    | AuthAction.AuthRequired
)> = (state = [], action) => {
  switch (action.type) {
    case NotificationActionType.CREATE:
      return [...state, action.payload.notification];
    case NotificationActionType.DESTROY:
      return state.filter(n => n.id !== action.payload.id);
    case "AUTH.REQUIRED": return [];
    default: return state;
  }
};

export default notifications;
