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
