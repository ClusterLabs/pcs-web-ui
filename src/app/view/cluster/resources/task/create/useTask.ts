import {ActionPayload} from "app/store";
import {useClusterTask} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";
import {selectGroups} from "app/view/cluster/resources/select";

const useAgent = (agentName: string) => {
  const {pcmkAgents} = useClusterSources();
  const agent = pcmkAgents[agentName];
  return {
    agent,
    isAgentLoaded:
      agent
      && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
  };
};

export const useTask = () => {
  const task = useClusterTask("resourceCreate");
  const {clusterName, state, dispatch} = task;
  const groupList = selectGroups(
    useClusterSources().loadedCluster.resourceTree,
  );
  const {agent, isAgentLoaded} = useAgent(state.agentName);

  return {
    ...task,
    groupIdList: groupList.map(g => g.id),
    isAgentLoaded,

    // validations
    isNameTypeValid:
      state.resourceName.length > 0 && state.agentName.length > 0,

    areInstanceAttrsValid:
      isAgentLoaded
      && agent.parameters.every(
        param =>
          !param.required
          || ("deprecated" in param && param.deprecated)
          || param.name in state.instanceAttrs,
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

    updateState: (payload: ActionPayload["RESOURCE.CREATE.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.CREATE.UPDATE",
        key: {clusterName},
        payload,
      });
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
