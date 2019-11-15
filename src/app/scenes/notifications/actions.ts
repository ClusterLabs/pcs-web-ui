import { Notification } from "./types";

export type NotificationActions = {
  Create: {
    type: "NOTIFICATION.CREATE",
    payload: {
      notification: Notification,
    }
  };

  Destroy: {
    type: "NOTIFICATION.DESTROY",
    payload: {
      id: number,
    }
  };
}
