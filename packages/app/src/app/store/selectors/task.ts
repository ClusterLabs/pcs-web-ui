import {Root, TaskKeys} from "./types";

export const getTask =
  <NAME extends TaskKeys>(name: NAME) =>
  (state: Root) =>
    state.tasks[name];

export const getCurrentTaskKey = (state: Root) => state.currentTaskKey;
