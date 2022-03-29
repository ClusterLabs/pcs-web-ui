import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

const initialState: {
  libCall: typeof initalLibCall;
} = {
  libCall: initalLibCall,
};

export const sbdDisable: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.SBD.DISABLE.CLOSE":
      return initialState;

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
