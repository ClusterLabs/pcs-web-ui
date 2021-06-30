import { combineReducers } from "redux";

import { AppReducer } from "app/store/reducers/appReducer";

import { resourceCreate } from "./resourceCreate";
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

type TaskState = Record<string, unknown>;
type ReducersMap<STATE extends TaskState> = {
  [K in keyof STATE]: AppReducer<STATE[K]>;
};

type ReducersMapKey<STATE extends TaskState> = keyof ReducersMap<STATE>;
type Task<STATE extends TaskState> = ReducersMap<STATE>[ReducersMapKey<STATE>];

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

// STATE extends Record<string, unknown> is here to enforce task state to be an
// object. This prevents the state to be undefined. So, when state `undefined`
// enters into to wrapper we know that it is a redux initialization.
function wrapTasks<STATE extends TaskState>(
  tasks: ReducersMap<STATE>,
): ReducersMap<STATE> {
  return (Object.keys(tasks) as Array<keyof typeof tasks>).reduce(
    (wrapped, taskKey) => ({
      ...wrapped,
      [taskKey]: wrapTaskReducer(taskKey, tasks[taskKey]),
    }),
    {} as ReducersMap<STATE>,
  );
}

export const tasks = combineReducers(
  wrapTasks({
    resourceCreate,
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
