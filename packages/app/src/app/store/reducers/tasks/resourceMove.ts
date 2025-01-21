import type {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  resourceId: string;
  resourceType: "primitive resource" | "group" | "clone";
  isPromotable: boolean;
  clusterName: string;
  useNode: boolean;
  node: string;
  nodeNameList: string[];
  constraintHandling: "autoclean" | "keep" | "expire";
  constraintLifetime: string;
  strictMode: boolean;
  limitToPromoted: boolean;
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
} = {
  resourceId: "",
  resourceType: "primitive resource",
  isPromotable: false,
  clusterName: "",
  useNode: false,
  node: "",
  nodeNameList: [],
  constraintHandling: "autoclean",
  constraintLifetime: "",
  strictMode: false,
  limitToPromoted: false,
  libCall: initialLibCall,
  showValidationErrors: false,
};

export const resourceMove: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.MOVE.OPEN":
      return {
        ...state,
        ...action.payload,
      };

    case "RESOURCE.MOVE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "RESOURCE.MOVE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
