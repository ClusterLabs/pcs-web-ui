import {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  resourceId: string;
  clusterName: string;
  libCall: typeof initialLibCall;
} = {
  resourceId: "",
  clusterName: "",
  libCall: initialLibCall,
};

export const resourceMove: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.MOVE.OPEN":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        resourceId: action.payload.resourceId,
      };
    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
