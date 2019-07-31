export interface Start {
  type: string,
  payload: { errorMessage: string },
}

export interface Success {
  type: string,
  payload: { errorMessage: string },
}

export interface Fail {
  type: string,
  payload: { errorMessage: string },
}

export type ActionTypes = (
  | Fail
  | Start
  | Success
);

export enum FetchStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface InitialFetchState {
  status: FetchStatus,
  errorMsg: string,
}
