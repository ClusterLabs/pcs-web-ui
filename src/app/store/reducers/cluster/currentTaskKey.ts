import {AppReducer} from "app/store/reducers/appReducer";

// contains list of opened resources
export const currentTaskKey: AppReducer<string | null> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case "TASK.CLUSTER.OPEN":
      return action.payload.taskKey;

    case "TASK.CLUSTER.CLOSE":
      return null;

    default:
      return state;
  }
};
