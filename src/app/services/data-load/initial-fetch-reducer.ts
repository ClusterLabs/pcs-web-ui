import * as authTypes from "app/services/auth/constants";
import * as types from "./initialFetchTypes";

interface ErrorMsg {
  name: string,
  message: string,
}

const initState: types.State = {
  status: types.FetchStatus.NOT_STARTED,
  errorMsg: "",
};

interface DataFetchTypes {
  START: string,
  SUCCESS: string,
  FAIL: string,
}

export const createDataFetchReducer = (
  dataFetchTypes: DataFetchTypes,
) => (
  state: types.State = initState,
  action: types.ActionTypes,
): types.State => {
  switch (action.type) {
    case dataFetchTypes.START: return {
      status: types.FetchStatus.IN_PROGRESS,
      errorMsg: "",
    };
    case dataFetchTypes.SUCCESS: return {
      status: types.FetchStatus.SUCCESS,
      errorMsg: "",
    };
    case dataFetchTypes.FAIL: return (
      state.status === types.FetchStatus.IN_PROGRESS
        ? {
          status: types.FetchStatus.ERROR,
          errorMsg: action.payload.errorMessage,
        }
        : state
    );
    case authTypes.AUTH_REQUIRED: return initState;
    default: return state;
  }
};

export const createDataFetchSelector = (
  getFetchState: (state: any) => types.State,
) => (state: any) => ({
  isSuccess: getFetchState(state).status === types.FetchStatus.SUCCESS,
  isError: getFetchState(state).status === types.FetchStatus.ERROR,
  errorMessage: getFetchState(state).errorMsg,
});
