import {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  libCall: typeof initialLibCall;
} = {
  libCall: initialLibCall,
};

export const sbdDisable: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.SBD.DISABLE.CLOSE":
      return initialState;

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
