import { NotificationActions } from "app/store/actions";

export type Notification = NotificationActions["Create"]["payload"]["notification"];

export type NotificationState = Notification[];
