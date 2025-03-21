import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionPayload} from "app/store/actions";

import {
  constraintSingleCall,
  initialState as initialCall,
} from "./constraintSingleCall";

type Placement = Exclude<
  ActionPayload["CONSTRAINT.COLOCATION.CREATE.UPDATE"]["placement"],
  undefined
>;

const initialState: {
  clusterName: string;
  resourceIdList: string[];
  resourceId: string;
  withResourceId: string;
  placement: Placement;
  score: string;
  call: typeof initialCall;
  showValidationErrors: boolean;
} = {
  clusterName: "",
  resourceIdList: [],
  resourceId: "",
  withResourceId: "",
  placement: "together",
  score: "",
  call: initialCall,
  showValidationErrors: false,
};

export const constraintColocationCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.COLOCATION.CREATE.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        resourceIdList: action.payload.resourceIdList,
      };
    case "CONSTRAINT.COLOCATION.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.COLOCATION.CREATE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, call: constraintSingleCall(state.call, action)};
  }
};
