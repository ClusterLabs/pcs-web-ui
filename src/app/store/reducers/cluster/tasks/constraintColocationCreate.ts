import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import {
  constraintSingleCall,
  initialState as initialCall,
} from "./constraintSingleCall";

type Placement = Exclude<
  ActionPayload["CONSTRAINT.COLOCATION.CREATE.UPDATE"]["placement"],
  undefined
>;

const initialState: {
  resourceId: string;
  withResourceId: string;
  placement: Placement;
  score: string;
  call: typeof initialCall;
} = {
  resourceId: "",
  withResourceId: "",
  placement: "together",
  score: "",
  call: initialCall,
};

export const constraintColocationCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.COLOCATION.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.COLOCATION.CREATE.CLOSE":
      return initialState;

    default:
      return { ...state, call: constraintSingleCall(state.call, action) };
  }
};
