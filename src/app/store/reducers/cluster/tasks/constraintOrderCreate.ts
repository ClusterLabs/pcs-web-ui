import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import {
  constraintSingleCall,
  initialState as initialCall,
} from "./constraintSingleCall";

type Action<T extends "firstAction" | "thenAction"> = Exclude<
  ActionPayload["CONSTRAINT.ORDER.CREATE.UPDATE"][T],
  undefined
>;

const initialState: {
  firstResourceId: string;
  firstAction: Action<"firstAction">;
  thenResourceId: string;
  thenAction: Action<"thenAction">;
  call: typeof initialCall;
  score: string;
  showValidationErrors: boolean;
} = {
  firstResourceId: "",
  firstAction: "start",
  thenResourceId: "",
  thenAction: "start",
  call: initialCall,
  score: "",
  showValidationErrors: false,
};

export const constraintOrderCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
        showValidationErrors: false,
      };

    case "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES":
      return {
        ...state,
        firstResourceId: state.thenResourceId,
        firstAction: state.thenAction,
        thenResourceId: state.firstResourceId,
        thenAction: state.firstAction,
      };

    case "CONSTRAINT.ORDER.CREATE.CLOSE":
      return initialState;

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, call: constraintSingleCall(state.call, action) };
  }
};
