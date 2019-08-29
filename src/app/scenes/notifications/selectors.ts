import { Selector, RootState } from "app/core/types";

import { NotificationState } from "./types";

export const getNotifications: Selector<RootState, NotificationState> = (
  state => state.notifications
);
