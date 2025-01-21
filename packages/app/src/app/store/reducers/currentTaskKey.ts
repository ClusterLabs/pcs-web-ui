import type {AppReducer} from "app/store/reducers/appReducer";

export const currentTaskKey: AppReducer<string | null> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case "TASK.OPEN":
      return action.payload.taskKey;

    case "TASK.CLOSE":
      return null;

    default:
      return state;
  }
};
