import { combineReducers } from "redux";

import {
  ReducersMapKey,
  Task,
  TaskState,
  wrapTasks,
} from "app/store/taskTools";

import { clusterSetup } from "./clusterSetup";

const wrapTaskReducer =
  <STATE extends TaskState>(
    key: ReducersMapKey<STATE>,
    task: Task<STATE>,
  ): Task<STATE> =>
  (state, action) => {
    if (
      // undefined state means initialization - so the action can be drilled
      // down to original `task` reducer to get initial state.
      state !== undefined
      && "key" in action
      && (("task" in action.key && action.key.task !== key)
        || ("clusterName" in action.key && action.key.clusterName !== null))
    ) {
      return state;
    }
    return task(state, action);
  };
export const tasks = combineReducers(
  wrapTasks(wrapTaskReducer)({ clusterSetup }),
);
