import { types } from "app/store/reducers";

import { Selector } from "./selector";

type NotificationState = types.notifications.NotificationState;
export const getNotifications: Selector<NotificationState> = state =>
  state.notifications;
