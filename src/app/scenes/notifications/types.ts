export enum NotificationActionType {
  CREATE = "/notifications/CREATE",
  DESTROY = "/notifications/DESTROY",
}

export enum NotificationSeverity {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface Notification {
  id: number,
  severity: NotificationSeverity,
  message: string,
}
