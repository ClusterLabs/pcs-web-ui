import { Notification } from "./types";

export interface Create {
  type: "NOTIFICATION.CREATE",
  payload: {
    notification: Notification,
  }
}

export interface Destroy {
  type: "NOTIFICATION.DESTROY",
  payload: {
    id: number,
  }
}
