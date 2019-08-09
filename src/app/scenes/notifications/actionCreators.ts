import { NotificationActionType, NotificationSeverity } from "./types";
import * as NotificationAction from "./actions";

let nextId = 1;

const create = (
  severity: NotificationSeverity,
  message: string,
): NotificationAction.Create => ({
  type: NotificationActionType.CREATE,
  payload: {
    notification: {
      id: nextId++,
      severity,
      message,
    },
  },
});

export const destroy = (id: number) => ({
  type: NotificationActionType.DESTROY,
  payload: { id },
});

export const info = (message: string) => create(
  NotificationSeverity.INFO,
  message,
);

export const success = (message: string) => create(
  NotificationSeverity.SUCCESS,
  message,
);

export const error = (message: string) => create(
  NotificationSeverity.ERROR,
  message,
);
