import { useSelector } from "react-redux";

import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

const useAgent = (clusterName: string, agentName: string) => {
  const agent = useSelector(selectors.getPcmkAgent(clusterName, agentName));
  return {
    agent,
    isAgentLoaded:
      agent
      && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
  };
};

export const useTask = () => {
  const task = useClusterTask("resourceCreate");
  const { clusterName, state, dispatch } = task;
  const [groupList] = useClusterSelector(selectors.getGroups);
  const { agent, isAgentLoaded } = useAgent(clusterName, state.agentName);

  return {
    ...task,
    groupList,
    isAgentLoaded,

    // validations
    isNameTypeValid:
      state.resourceName.length > 0 && state.agentName.length > 0,

    areInstanceAttrsValid:
      isAgentLoaded
      && agent.parameters.every(
        param => !param.required || param.name in state.instanceAttrs,
      ),

    areSettingsValid: state.useGroup !== "new" || state.group.length > 0,

    // actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: { clusterName, task: task.name },
      });
      dispatch({
        type: "RESOURCE.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    updateState: (payload: ActionPayload["RESOURCE.CREATE.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.CREATE.UPDATE",
        key: { clusterName },
        payload,
      });
    },

    create: ({ force }: { force: boolean }) => {
      if (state.useGroup !== "no") {
        dispatch({
          type: "LIB.CALL.CLUSTER.TASK",
          key: { clusterName, task: task.name },
          payload: {
            taskLabel: `create resource "${state.resourceName}"`,
            call: {
              name: "resource-create_in_group",
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
          key: { clusterName, task: task.name },
          payload: {
            taskLabel: `create resource "${state.resourceName}"`,
            call: {
              name: "resource-create_as_clone",
              payload: {
                resource_id: state.resourceName,
                resource_agent_name: state.agentName,
                instance_attributes: state.instanceAttrs,
                clone_meta_options: {
                  ...(state.promotable ? { promotable: "true" } : {}),
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
        key: { clusterName, task: task.name },
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
