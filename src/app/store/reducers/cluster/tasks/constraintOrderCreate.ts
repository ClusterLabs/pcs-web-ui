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
} = {
  firstResourceId: "",
  firstAction: "start",
  thenResourceId: "",
  thenAction: "start",
  call: initialCall,
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

    default:
      return { ...state, call: constraintSingleCall(state.call, action) };
  }
};
