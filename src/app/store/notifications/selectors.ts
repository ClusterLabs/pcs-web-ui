import { Selector } from "../types";

import { NotificationState } from "./types";

export const getNotifications: Selector<NotificationState> = state =>
  state.notifications;
