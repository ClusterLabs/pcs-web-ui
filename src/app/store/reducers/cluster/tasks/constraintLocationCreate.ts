import { AppReducer } from "app/store/reducers/appReducer";

import {
  constraintSingleCall,
  initialState as initialCall,
} from "./constraintSingleCall";

const initialState: {
  resourceSpecification: "resource" | "pattern";
  resourceId: string;
  resourcePattern: string;
  locationSpecification: "node" | "rule";
  nodeName: string;
  rule: string;
  call: typeof initialCall;
  preference: "prefer" | "avoid";
  score: string;
  showValidationErrors: boolean;
} = {
  resourceSpecification: "resource",
  resourceId: "",
  resourcePattern: "",
  locationSpecification: "node",
  nodeName: "",
  rule: "",
  preference: "prefer",
  score: "",
  call: initialCall,
  showValidationErrors: false,
};

export const constraintLocationCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.LOCATION.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.LOCATION.CREATE.CLOSE":
      return initialState;

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, call: constraintSingleCall(state.call, action) };
  }
};
