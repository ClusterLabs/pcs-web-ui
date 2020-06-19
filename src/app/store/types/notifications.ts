import { NotificationActions } from "app/actions";

export type Notification = NotificationActions["Create"]["payload"]["notification"];

export type NotificationState = Notification[];
