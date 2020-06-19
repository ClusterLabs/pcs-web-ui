export type AUTH_STATE =
  | "INITIAL"
  | "CHECKING"
  | "ALREADY_AUTHENTICATED"
  | "NOT_AUTHENTICATED"
  | "ERROR"
  | "AUTHENTICATION_IN_PROGRESS"
  | "AUTHENTICATION_FAILED";

export type ADD_STATE = "STARTED" | "SUCCESS" | "ERROR" | "DASHBOARD_RELOADING";

export type NodeName = string;
export type StateError = string;

export interface DashboardAddClusterPageState {
  nodeName: NodeName;
  stepAuthState: AUTH_STATE;
  stepAddState: ADD_STATE;
  stateError: StateError;
}
