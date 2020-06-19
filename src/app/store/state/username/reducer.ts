import { Reducer } from "redux";

import { Action } from "app/actions";
import { types } from "app/store";

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
