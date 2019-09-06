import { Reducer } from "redux";

import { UsernameState } from "./types";
import * as UsernameAction from "./actions";

const auth: Reducer<UsernameState, (
  |UsernameAction.SetUsername
)> = (state = "", action) => {
  switch (action.type) {
    case "USERNAME.SET": return action.payload.username;
    default: return state;
  }
};

export default auth;
