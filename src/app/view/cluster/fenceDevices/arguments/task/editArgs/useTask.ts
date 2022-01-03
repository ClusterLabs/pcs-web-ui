import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("fenceDeviceArgsEdit");
  const { open, dispatch, clusterName, state } = task;
  const key = { clusterName };

  return {
    ...task,
    open: (payload: ActionPayload["FENCE_DEVICE.EDIT_ARGS.OPEN"]) => {
      dispatch({
        type: "FENCE_DEVICE.EDIT_ARGS.OPEN",
        key,
        payload,
      });
      open();
    },

    update: (id: string, value: string) =>
      dispatch({
        type: "FENCE_DEVICE.EDIT_ARGS.UPDATE",
        key,
        payload: {
          id,
          value,
        },
      }),

    runUpdate: () =>
      dispatch({
        type: "FENCE_DEVICE.EDIT_ARGS.RUN",
        key,
        payload: {
          fenceDeviceId: state.fenceDeviceId,
          attributes: Object.values(state.fenceDeviceArguments).reduce(
            (attrs, { id, value }) => ({ ...attrs, [id]: value }),
            {},
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
