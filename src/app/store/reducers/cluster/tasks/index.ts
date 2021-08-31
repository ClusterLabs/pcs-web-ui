import { combineReducers } from "redux";

import {
  ReducersMapKey,
  Task,
  TaskState,
  wrapTasks,
} from "app/store/taskTools";

import { resourceCreate } from "./resourceCreate";
import { fenceDeviceCreate } from "./fenceDeviceCreate";
import { primitiveGroupChange } from "./primitiveGroupChange";
import { constraintLocationCreate } from "./constraintLocationCreate";
import { constraintOrderCreate } from "./constraintOrderCreate";
import { constraintOrderSetCreate } from "./constraintOrderSetCreate";
import { constraintTicketCreate } from "./constraintTicketCreate";
import { constraintTicketSetCreate } from "./constraintTicketSetCreate";
import { constraintColocationCreate } from "./constraintColocationCreate";
import { constraintColocationSetCreate } from "./constraintColocationSetCreate";
import { resourceGroup } from "./resourceGroup";
import { nodeAdd } from "./nodeAdd";
import { fixAuth } from "./fixAuth";

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
      && "task" in action.key
      && action.key.task !== key
    ) {
      return state;
    }
    return task(state, action);
  };

export const tasks = combineReducers(
  wrapTasks(wrapTaskReducer)({
    resourceCreate,
    fenceDeviceCreate,
    primitiveGroupChange,
    constraintLocationCreate,
    constraintOrderCreate,
    constraintOrderSetCreate,
    constraintTicketCreate,
    constraintTicketSetCreate,
    constraintColocationCreate,
    constraintColocationSetCreate,
    resourceGroup,
    nodeAdd,
    fixAuth,
  }),
);
