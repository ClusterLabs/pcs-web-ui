import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

type OpenPayload = ActionPayload["FENCE_DEVICE.EDIT_ARGS.OPEN"];

const prepareAttributes = (
  originalFenceDeviceArgs: OpenPayload["fenceDeviceArguments"],
  fenceDeviceArgs: OpenPayload["fenceDeviceArguments"],
) => {
  const changed = Object.entries(fenceDeviceArgs).reduce(
    (changedArgs, [name, value]) => {
      if (
        !(name in originalFenceDeviceArgs) ||
        value !== originalFenceDeviceArgs[name]
      ) {
        return {...changedArgs, [name]: value};
      }
      return changedArgs;
    },
    {},
  );

  const removed = Object.entries(originalFenceDeviceArgs).reduce(
    (removedArgs, [name, value]) => {
      if (value !== "" && name in fenceDeviceArgs === false) {
        return {...removedArgs, [name]: ""};
      }
      return removedArgs;
    },
    {},
  );

  return {...changed, ...removed};
};

export const useTask = () => {
  const task = useTaskCommon("fenceDeviceArgsEdit");
  const {dispatch, state} = task;
  const {clusterName} = state;
  const key = {clusterName};

  return {
    ...task,
    clusterName,

    update: (name: string, value: string) =>
      dispatch({
        type: "FENCE_DEVICE.EDIT_ARGS.UPDATE",
        key,
        payload: {
          name,
          value,
        },
      }),

    runUpdate: () =>
      dispatch({
        type: "FENCE_DEVICE.EDIT_ARGS.RUN",
        key,
        payload: {
          fenceDeviceId: state.fenceDeviceId,
          attributes: prepareAttributes(
            state.originalFenceDeviceArguments,
            state.fenceDeviceArguments,
          ),
        },
      }),
    recoverFromError: () =>
      dispatch({
        type: "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR.RECOVER",
        key,
      }),
  };
};
