import type {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  fenceDeviceName: string;
  clusterName: string;
  libCall: typeof initialLibCall;
} = {
  fenceDeviceName: "",
  clusterName: "",
  libCall: initialLibCall,
};

export const fenceDeviceDisable: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "FENCE_DEVICE.DISABLE.INIT":
      return {
        ...state,
        fenceDeviceName: action.payload.fenceDeviceName,
        clusterName: action.key.clusterName,
      };
    case "FENCE_DEVICE.DISABLE.CLOSE":
      return initialState;

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
