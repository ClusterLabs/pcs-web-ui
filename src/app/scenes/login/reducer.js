import * as authTypes from "app/services/auth/constants"
import * as types from "./constants"

const defaultState = {
  required: false,
  acceptLoginData: false,
  failed: false,
};

export default function login(state=defaultState, action) {
  switch(action.type){
    case authTypes.AUTH_REQUIRED: return {
      ...state,
      required: true,
      acceptLoginData: true,
    }
    case types.ENTER_CREDENTIALS: return {
      ...state,
      acceptLoginData: false,
    }
    case authTypes.AUTH_SUCCESS: return {
      required: false,
      acceptLoginData: false,
      failed: false,
    }
    case types.LOGIN_FAILED: return {
      required: true,
      acceptLoginData: true,
      failed: action.payload,
    }
    case types.LOGOUT_SUCCESS: return {
      required: true,
      acceptLoginData: true,
      failed: false,
    }
    default: return state
  }
}
