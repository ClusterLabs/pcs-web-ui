import type {Root, TaskKeys} from "./types";

export const getUsername = (state: Root) => state.username;

export const usernameLoaded = (state: Root) => state.username !== "";

export const getUser = (state: Root) => state.user;

export const getNotifications = (state: Root) => state.notifications;

export const getAuthNodeState = (id: number) => (state: Root) =>
  state.nodeAuthMap[id];

export const getTask =
  <NAME extends TaskKeys>(name: NAME) =>
  (state: Root) =>
    state.tasks[name];

export const getCurrentTaskKey = (state: Root) => state.currentTaskKey;
