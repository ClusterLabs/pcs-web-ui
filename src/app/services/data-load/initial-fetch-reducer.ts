import { Reducer } from "redux";
import * as authTypes from "app/services/auth/constants";
import { InitialFetchState, FetchStatus } from "./initialFetchTypes";

interface ErrorMsg {
  name: string,
  message: string,
}

const initState: InitialFetchState = {
  status: FetchStatus.NOT_STARTED,
  errorMsg: "",
};

interface FetchTypes {
  START: string,
  SUCCESS: string,
  FAIL: string,
}

export const createDataFetchReducer = (
  fetchTypes: FetchTypes,
): Reducer<InitialFetchState> => (
  state = initState,
  action,
): InitialFetchState => {
  switch (action.type) {
    case fetchTypes.START: return {
      status: FetchStatus.IN_PROGRESS,
      errorMsg: "",
    };
    case fetchTypes.SUCCESS: return {
      status: FetchStatus.SUCCESS,
      errorMsg: "",
    };
    case fetchTypes.FAIL: return (
      state.status === FetchStatus.IN_PROGRESS
        ? {
          status: FetchStatus.ERROR,
          errorMsg: action.payload.errorMessage,
        }
        : state
    );
    case authTypes.AUTH_REQUIRED: return initState;
    default: return state;
  }
};

export const createDataFetchSelector = (
  getFetchState: (state: any) => InitialFetchState,
) => (state: any) => ({
  isSuccess: getFetchState(state).status === FetchStatus.SUCCESS,
  isError: getFetchState(state).status === FetchStatus.ERROR,
  errorMessage: getFetchState(state).errorMsg,
});
