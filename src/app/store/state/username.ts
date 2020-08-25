import { Reducer } from "app/store/redux";

export type UsernameState = string;

const auth: Reducer<UsernameState> = (state = "", action) => {
  switch (action.type) {
    case "USERNAME.SET":
      return action.payload.username;
    default:
      return state;
  }
};

export default auth;
