import * as types from "./constants";

const defaultState = {
  authRequired: false,
};

export default function dashboard(state = defaultState, action) {
  switch (action.type) {
    case types.AUTH_REQUIRED: return {
      ...state,
      authRequired: true,
    };
    case types.STOP_REQUIRE_AUTH_DATA_CHANGED: return {
      ...state,
      authRequired: false,
    };
    default: return state;
  }
}
