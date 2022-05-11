import { Root } from "./types";

export const getAlertNotifications = (state: Root) =>
  state.notifications.filter(n => n.isVisible);

export const getDrawerNotifications = (state: Root) => state.notifications;
