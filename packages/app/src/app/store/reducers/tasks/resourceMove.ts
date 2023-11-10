import {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  resourceId: string;
  clusterName: string;
  useNode: boolean;
  node: string;
  nodeNameList: string[];
  libCall: typeof initialLibCall;
} = {
  resourceId: "",
  clusterName: "",
  useNode: false,
  node: "",
  nodeNameList: [],
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
        ...action.payload,
      };
    case "RESOURCE.MOVE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
