const fetchStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};
const initState = {
  status: fetchStatus.NOT_STARTED,
  errorMsg: "",
};

export const createDataFetchReducer = types => (state = initState, action) => {
  switch (action.type) {
    case types.START: return {
      status: fetchStatus.IN_PROGRESS,
      errorMsg: "",
    };
    case types.SUCCESS: return {
      status: fetchStatus.SUCCESS,
      errorMsg: "",
    };
    case types.FAIL: return (
      state.status === fetchStatus.IN_PROGRESS
        ? {
          status: fetchStatus.ERROR,
          errorMsg: action.payload,
        }
        : state
    );
    default: return state;
  }
};

export const createDataFetchSelector = getFetchState => state => ({
  isSuccess: getFetchState(state).status === fetchStatus.SUCCESS,
  isError: getFetchState(state).status === fetchStatus.ERROR,
  errorMessage: getFetchState(state).errorMsg.message,
});
