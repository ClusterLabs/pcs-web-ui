import { Reducer } from "./tools";

export const username: Reducer<string> = (state = "", action) => {
  switch (action.type) {
    case "USERNAME.SET":
      return action.payload.username;
    default:
      return state;
  }
};
