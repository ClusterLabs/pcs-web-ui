import { Reducer } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

const auth: Reducer<types.username.UsernameState, Action> = (
  state = "",
  action,
) => {
  switch (action.type) {
    case "USERNAME.SET":
      return action.payload.username;
    default:
      return state;
  }
};

export default auth;
