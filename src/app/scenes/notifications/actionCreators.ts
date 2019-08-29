import { Notification } from "./types";
import * as NotificationAction from "./actions";

let nextId = 1;

export const create = (
  severity: Notification["severity"],
  message: string,
): NotificationAction.Create => ({
  type: "NOTIFICATION.CREATE",
  payload: {
    notification: {
      id: nextId++,
      severity,
      message,
    },
  },
});

export const destroy = (id: number): NotificationAction.Destroy => ({
  type: "NOTIFICATION.DESTROY",
  payload: { id },
});
