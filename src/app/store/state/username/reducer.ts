import { Reducer } from "redux";

import { types } from "app/store";
import { Action } from "app/store/actions";

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
