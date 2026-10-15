import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("fenceDeviceDisable");
  const {dispatch, state} = task;
  const {fenceDeviceName} = state;

  return {
    ...task,
    label: "Disable Fence Device",

    //actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {task: task.name},
      });
      dispatch({
        type: "FENCE_DEVICE.DISABLE.CLOSE",
      });
    },

    disableFenceDevice: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {task: task.name},
        payload: {
          taskLabel: "disable fence device",
          call: {
            name: "resource-disable",
            payload: {
              resource_or_tag_ids: [fenceDeviceName],
              ...(force ? {force_flags: ["FORCE"]} : {}),
            },
          },
        },
      });
    },
  };
};
