import { Reducer } from "redux";

import { Action } from "app/store/actions";

export type UsernameState = string;

const auth: Reducer<UsernameState, Action> = (state = "", action) => {
  switch (action.type) {
    case "USERNAME.SET":
      return action.payload.username;
    default:
      return state;
  }
};

export default auth;
