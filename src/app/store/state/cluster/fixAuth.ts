import { Reducer, combineReducers } from "app/store/redux";

export type FixAuth = {
  authProcessId: number | null;
  open: boolean;
  fixing: boolean;
  errorMessage: string;
};

const authProcessId: Reducer<FixAuth["authProcessId"]> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.FIX_AUTH.AUTH_STARTED":
      return action.payload.authProcessId;
    case "CLUSTER.FIX_AUTH.CANCEL":
    case "CLUSTER.FIX_AUTH.AUTH_DONE":
      return null;
    default:
      return state;
  }
};

const open: Reducer<FixAuth["open"]> = (state = false, action) => {
  switch (action.type) {
    case "CLUSTER.FIX_AUTH.AUTH_STARTED":
      return true;
    case "CLUSTER.FIX_AUTH.CANCEL":
      return false;
    default:
      return state;
  }
};

const fixing: Reducer<FixAuth["fixing"]> = (state = false, action) => {
  switch (action.type) {
    case "CLUSTER.FIX_AUTH.AUTH_DONE":
      return true;
    case "CLUSTER.FIX_AUTH.OK":
    case "CLUSTER.FIX_AUTH.FAIL":
    case "CLUSTER.FIX_AUTH.ERROR":
    case "CLUSTER.FIX_AUTH.CANCEL":
      return false;
    default:
      return state;
  }
};
const errorMessage: Reducer<FixAuth["errorMessage"]> = (state = "", action) => {
  switch (action.type) {
    case "CLUSTER.FIX_AUTH.OK":
    case "CLUSTER.FIX_AUTH.CANCEL":
      return "";
    case "CLUSTER.FIX_AUTH.FAIL":
    case "CLUSTER.FIX_AUTH.ERROR":
      return action.payload.message;
    default:
      return state;
  }
};

export default combineReducers<FixAuth>({
  authProcessId,
  open,
  fixing,
  errorMessage,
});
