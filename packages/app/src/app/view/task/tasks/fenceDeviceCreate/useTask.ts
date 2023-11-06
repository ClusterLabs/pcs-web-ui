import {useSelector} from "react-redux";

import {ActionPayload, selectors} from "app/store";
import {useTask as useTaskCommon} from "app/view/share";

export const useTask = () => {
  const task = useTaskCommon("fenceDeviceCreate");
  const {state, dispatch} = task;
  const {clusterName} = state;
  const agentInfo = useSelector(
    selectors.getAgentInfo(clusterName, state.agentName),
  );

  return {
    ...task,
    clusterName,
    isAgentLoaded: agentInfo !== null && agentInfo.isAgentLoaded,

    // validations
    isNameTypeValid:
      state.fenceDeviceName.length > 0 && state.agentName.length > 0,

    areInstanceAttrsValid:
      agentInfo !== null
      && agentInfo.isAgentLoaded
      && agentInfo.agent.parameters.every(
        param =>
          !param.required
          || ("deprecated" in param && param.deprecated)
          || param.name in state.instanceAttrs,
      ),

    // actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "FENCE_DEVICE.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    updateState: (payload: ActionPayload["FENCE_DEVICE.CREATE.UPDATE"]) => {
      dispatch({
        type: "FENCE_DEVICE.CREATE.UPDATE",
        key: {clusterName},
        payload,
      });
    },

    create: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `create fence device "${state.fenceDeviceName}"`,
          call: {
            name: "stonith-create",
            payload: {
              stonith_id: state.fenceDeviceName,
              stonith_agent_name: state.agentName,
              instance_attributes: state.instanceAttrs,
              ensure_disabled: state.disabled,
              operations: [],
              meta_attributes: {},
              allow_absent_agent: force,
              allow_invalid_operation: force,
              allow_invalid_instance_attributes: force,
            },
          },
        },
      });
    },
  };
};
