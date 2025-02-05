import {useSelector} from "react-redux";

import {type ActionPayload, selectors} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceCreate");
  const {state, dispatch} = task;
  const {clusterName} = state;
  const agentInfo = useSelector(
    selectors.getAgentInfo(clusterName, state.agentName),
  );
  const updateState = (payload: ActionPayload["RESOURCE.CREATE.UPDATE"]) => {
    dispatch({
      type: "RESOURCE.CREATE.UPDATE",
      key: {clusterName},
      payload,
    });
  };

  return {
    ...task,
    clusterName,
    groupIdList: state.groupIdStructureList.map(g => g.id),
    isAgentLoaded: agentInfo?.isAgentLoaded,

    // validations
    isNameTypeValid:
      state.resourceName.length > 0 && state.agentName.length > 0,

    areInstanceAttrsValid:
      agentInfo?.isAgentLoaded &&
      agentInfo.agent.parameters.every(
        param =>
          !param.required ||
          ("deprecated" in param && param.deprecated) ||
          param.name in state.instanceAttrs,
      ),

    areSettingsValid: state.useGroup !== "new" || state.group.length > 0,

    // actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "RESOURCE.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    updateState,

    selectAgent: (value: string) => {
      dispatch({
        type: "RESOURCE_AGENT.ENSURE",
        key: {clusterName},
        payload: {agentName: value},
      });
      updateState({agentName: value});
    },

    create: ({force}: {force: boolean}) => {
      if (state.useGroup !== "no") {
        dispatch({
          type: "LIB.CALL.CLUSTER.TASK",
          key: {clusterName, task: task.name},
          payload: {
            taskLabel: `create resource "${state.resourceName}"`,
            call: {
              name: "resource-create-in-group",
              payload: {
                resource_id: state.resourceName,
                resource_agent_name: state.agentName,
                group_id: state.group,
                instance_attributes: state.instanceAttrs,
                ensure_disabled: state.disabled,
                operation_list: [],
                meta_attributes: {},
                allow_absent_agent: force,
                allow_invalid_operation: force,
                allow_invalid_instance_attributes: force,
                allow_not_suitable_command: force,
              },
            },
          },
        });
        return;
      }

      if (state.clone) {
        dispatch({
          type: "LIB.CALL.CLUSTER.TASK",
          key: {clusterName, task: task.name},
          payload: {
            taskLabel: `create resource "${state.resourceName}"`,
            call: {
              name: "resource-create-as-clone",
              payload: {
                resource_id: state.resourceName,
                resource_agent_name: state.agentName,
                instance_attributes: state.instanceAttrs,
                clone_meta_options: {
                  ...(state.promotable ? {promotable: "true"} : {}),
                },
                ensure_disabled: state.disabled,
                operation_list: [],
                meta_attributes: {},
                allow_absent_agent: force,
                allow_invalid_operation: force,
                allow_invalid_instance_attributes: force,
                allow_not_suitable_command: force,
              },
            },
          },
        });
        return;
      }
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `create resource "${state.resourceName}"`,
          call: {
            name: "resource-create",
            payload: {
              resource_id: state.resourceName,
              resource_agent_name: state.agentName,
              instance_attributes: state.instanceAttrs,
              ensure_disabled: state.disabled,
              operation_list: [],
              meta_attributes: {},
              allow_absent_agent: force,
              allow_invalid_operation: force,
              allow_invalid_instance_attributes: force,
              allow_not_suitable_command: force,
            },
          },
        },
      });
    },
  };
};
