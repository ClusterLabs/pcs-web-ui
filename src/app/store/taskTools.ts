import { AppReducer } from "./reducers/appReducer";

export type TaskState = Record<string, unknown>;
export type ReducersMap<STATE extends TaskState> = {
  [K in keyof STATE]: AppReducer<STATE[K]>;
};

export type ReducersMapKey<STATE extends TaskState> = keyof ReducersMap<STATE>;
export type Task<STATE extends TaskState> =
  ReducersMap<STATE>[ReducersMapKey<STATE>];

type SingleTaskReducerWrapper = <STATE extends TaskState>(
  _key: ReducersMapKey<STATE>,
  _task: Task<STATE>,
) => Task<STATE>;

// STATE extends Record<string, unknown> is here to enforce task state to be an
// object. This prevents the state to be undefined. So, when state `undefined`
// enters into to wrapper we know that it is a redux initialization.
export const wrapTasks =
  (wrapSingleTaskReducer: SingleTaskReducerWrapper) =>
  <STATE extends TaskState>(tasks: ReducersMap<STATE>): ReducersMap<STATE> => {
    return (Object.keys(tasks) as Array<keyof typeof tasks>).reduce(
      (wrapped, taskKey) => ({
        ...wrapped,
        [taskKey]: wrapSingleTaskReducer(taskKey, tasks[taskKey]),
      }),
      {} as ReducersMap<STATE>,
    );
  };
