import { AppReducer } from "app/store/reducers/appReducer";

const initialState = {
  // Detected that authorization is required.
  required: false,
  // For distinguish between "wellcome" page and "goodbye" page.
  logoutApplied: false,
  // For disabling "login" button during login attempt.
  acceptLoginData: false,
  // Keeps information about failed login attempt.
  failed: false,
  badCredentials: false,
  errorMessage: "",
};

export const login: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "AUTH.REQUIRED":
      return {
        ...state,
        required: true,
        acceptLoginData: true,
      };

    case "LOGIN.ENTER_CREDENTIALS":
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

    case "LOGIN.LOGOUT.SUCCESS":
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
