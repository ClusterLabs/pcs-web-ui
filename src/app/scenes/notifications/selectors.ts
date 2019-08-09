import { Selector, RootState, RootStateKey } from "app/core/types";

import { NotificationState } from "./types";

export const getNotifications: Selector<RootState, NotificationState> = (
  state => state[RootStateKey.Notifications]
);
