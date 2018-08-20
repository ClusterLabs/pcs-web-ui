import * as types from "./constants"

const defaultState = {
  required: false,
  acceptLoginData: false,
  failed: false,
};

export default function login(state=defaultState, action) {
  switch(action.type){
    case types.REQUIRE_LOGIN: return {
      ...state,
      required: true,
      acceptLoginData: true,
    }
    case types.ENTER_CREDENTIALS: return {
      ...state,
      acceptLoginData: false,
    }
    case types.LOGIN_SUCCESS: return {
      required: false,
      acceptLoginData: false,
      failed: false,
    }
    case types.LOGIN_FAILED: return {
      required: true,
      acceptLoginData: true,
      failed: true,
    }
    case types.LOGOUT_SUCCESS: return {
      required: true,
      acceptLoginData: true,
      failed: false,
    }
    default: return state
  }
}
