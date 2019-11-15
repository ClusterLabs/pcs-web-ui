import { Action } from "app/common/actions";
import { Notification } from "./types";

let nextId = 1;

export const create = (
  severity: Notification["severity"],
  message: string,
): Action => ({
  type: "NOTIFICATION.CREATE",
  payload: {
    notification: {
      id: nextId++,
      severity,
      message,
    },
  },
});

export const destroy = (id: number): Action => ({
  type: "NOTIFICATION.DESTROY",
  payload: { id },
});
