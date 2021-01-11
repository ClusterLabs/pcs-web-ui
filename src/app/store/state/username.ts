import { Reducer } from "app/store/redux";

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
