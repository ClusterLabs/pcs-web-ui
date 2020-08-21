import { Reducer } from "app/store/redux";

export interface LoginState {
  // Detected that authorization is required.
  required: boolean;
  // For distinguish between "wellcome" page and "goodbye" page.
  logoutApplied: boolean;
  // For disabling "login" button during login attempt.
  acceptLoginData: boolean;
  // Keeps information about failed login attempt.
  failed: boolean;
  badCredentials: boolean;
  errorMessage: string;
}

const defaultState = {
  required: false,
  logoutApplied: false,
  acceptLoginData: false,
  failed: false,
  badCredentials: false,
  errorMessage: "",
};

const loginState: Reducer<LoginState> = (state = defaultState, action) => {
  switch (action.type) {
    case "AUTH.REQUIRED":
      return {
        ...state,
        required: true,
        acceptLoginData: true,
      };
    case "ENTER_CREDENTIALS":
      return {
        ...state,
        acceptLoginData: false,
      };
    case "AUTH.SUCCESS":
      return {
        ...state,
        required: false,
        acceptLoginData: false,
        failed: false,
        badCredentials: false,
        errorMessage: "",
      };
    case "LOGIN.FAILED":
      return {
        ...state,
        required: true,
        acceptLoginData: true,
        failed: true,
        badCredentials: action.payload.badCredentials,
        errorMessage: action.payload.message,
      };
    case "LOGOUT.SUCCESS":
      return {
        ...state,
        logoutApplied: true,
        required: true,
        acceptLoginData: true,
        failed: false,
        badCredentials: false,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default loginState;
