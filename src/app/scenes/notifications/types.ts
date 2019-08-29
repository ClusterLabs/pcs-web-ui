export interface Notification {
  id: number,
  severity: "INFO"|"SUCCESS"|"ERROR",
  message: string,
}

export type NotificationState = Notification[];
