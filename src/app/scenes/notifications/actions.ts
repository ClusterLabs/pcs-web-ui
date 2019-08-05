import { NotificationActionType, Notification } from "./types";

export interface Create {
  type: typeof NotificationActionType.CREATE,
  payload: {
    notification: Notification,
  }
}

export interface Destroy {
  type: typeof NotificationActionType.DESTROY,
  payload: {
    id: number,
  }
}
