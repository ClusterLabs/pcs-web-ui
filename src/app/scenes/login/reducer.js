import * as authTypes from "app/services/auth/constants"
import * as types from "./constants"

const defaultState = {
  // Detected that authorization is required.
  required: false,
  // Some request on protected url was sucessfull. It is reset on logout. But it
  // does not matter if auth is required.
  verified: false,
  // For distinguish between "wellcome" page and "goodbye" page.
  logoutApplied: false,
  // For disabling "login" button during login attempt.
  acceptLoginData: false,
  // Keeps information about failed login attempt.
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
      ...state,
      required: false,
      acceptLoginData: false,
      failed: false,
    }
    case authTypes.AUTH_VERIFIED: return {
      ...state,
      verified: true,
    }
    case types.LOGIN_FAILED: return {
      ...state,
      required: true,
      acceptLoginData: true,
      failed: action.payload,
    }
    case types.LOGOUT_SUCCESS: return {
      ...state,
      logoutApplied: true,
      required: true,
      verified: false,
      acceptLoginData: true,
      failed: false,
    }
    default: return state
  }
}
