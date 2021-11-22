import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { initialState as initialCall } from "./constraintSingleCall";

type Update = ActionPayload["CLUSTER.PERMISSION.CREATE.UPDATE"];

const initialState: Required<Update> & {
  call: typeof initialCall;
  showValidationErrors: boolean;
} = {
  name: "",
  type: "user",
  call: initialCall,
  read: true,
  write: false,
  grant: false,
  full: false,
  showValidationErrors: false,
};

export const permissionCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PERMISSION.CREATE.UPDATE":
      return { ...state, ...action.payload };

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
