import {ActionPayload} from "app/store";
import {AppReducer} from "app/store/reducers/appReducer";

type OpenPayload = ActionPayload["FENCE_DEVICE.EDIT_ARGS.OPEN"];
type FenceDeviceArgs = OpenPayload["fenceDeviceArguments"];

const initialState: OpenPayload & {
  originalFenceDeviceArguments: FenceDeviceArgs;
  call: {
    response: "" | "sending" | "ok" | "fail";
    resultMessage: string;
  };
} = {
  clusterName: "",
  fenceDeviceId: "",
  agentParameters: [],
  originalFenceDeviceArguments: {},
  fenceDeviceArguments: {},
  call: {
    response: "",
    resultMessage: "",
  },
};

export const fenceDeviceArgsEdit: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "FENCE_DEVICE.EDIT_ARGS.OPEN":
      return {
        ...initialState,
        ...action.payload,
        originalFenceDeviceArguments: action.payload.fenceDeviceArguments,
      };

    case "FENCE_DEVICE.EDIT_ARGS.UPDATE":
      return {
        ...state,
        fenceDeviceArguments:
          action.payload.value !== ""
            ? {
                ...state.fenceDeviceArguments,
                [action.payload.name]: action.payload.value,
              }
            : Object.keys(state.fenceDeviceArguments)
                .filter(key => key !== action.payload.name)
                .reduce<FenceDeviceArgs>(
                  (argList, name) => ({
                    ...argList,
                    [name]: state.fenceDeviceArguments[name],
                  }),
                  {},
                ),
      };
    case "FENCE_DEVICE.EDIT_ARGS.RUN":
      return {
        ...state,
        call: {
          response: "sending",
          resultMessage: "",
        },
      };

    case "FENCE_DEVICE.EDIT_ARGS.RUN.OK":
      return {
        ...state,
        call: {
          response: "ok",
          resultMessage: "",
        },
      };

    case "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR":
      return {
        ...state,
        call: {
          response: "fail",
          resultMessage: action.payload.message,
        },
      };

    case "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR.RECOVER":
      return {
        ...state,
        call: {
          response: "",
          resultMessage: "",
        },
      };

    default:
      return state;
  }
};
