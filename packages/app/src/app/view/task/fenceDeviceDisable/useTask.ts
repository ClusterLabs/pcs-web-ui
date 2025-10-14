import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("fenceDeviceDisable");
  const {dispatch, state} = task;
  const {clusterName, fenceDeviceName} = state;

  return {
    ...task,
    clusterName,
    label: "Disable Fence Device",

    //actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "FENCE_DEVICE.DISABLE.CLOSE",
        key: {clusterName},
      });
    },

    disableFenceDevice: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
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
