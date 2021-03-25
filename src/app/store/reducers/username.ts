import { Reducer } from "./tools";

export type Username = string;

const username: Reducer<Username> = (state = "", action) => {
  switch (action.type) {
    case "USERNAME.SET":
      return action.payload.username;
    default:
      return state;
  }
};

export default username;
