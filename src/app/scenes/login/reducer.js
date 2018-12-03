import * as authTypes from "app/services/auth/constants";
import * as types from "./constants";

const defaultState = {
  // Detected that authorization is required.
  required: false,
  // For distinguish between "wellcome" page and "goodbye" page.
  logoutApplied: false,
  // For disabling "login" button during login attempt.
  acceptLoginData: false,
  // Keeps information about failed login attempt.
  failed: false,
};

export default function login(state = defaultState, action) {
  switch (action.type) {
    case authTypes.AUTH_REQUIRED: return {
      ...state,
      required: true,
      acceptLoginData: true,
    };
    case types.ENTER_CREDENTIALS: return {
      ...state,
      acceptLoginData: false,
    };
    case authTypes.AUTH_SUCCESS: return {
      ...state,
      required: false,
      acceptLoginData: false,
      failed: false,
    };
    case types.LOGIN_FAILED: return {
      ...state,
      required: true,
      acceptLoginData: true,
      failed: action.payload,
    };
    case types.LOGOUT_SUCCESS: return {
      ...state,
      logoutApplied: true,
      required: true,
      acceptLoginData: true,
      failed: false,
    };
    default: return state;
  }
}
