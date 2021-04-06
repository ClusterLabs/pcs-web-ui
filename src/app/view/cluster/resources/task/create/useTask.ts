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

    create: ({ force }: { force: boolean }) =>
      dispatch({
        type: "RESOURCE.CREATE",
        key: { clusterName },
        payload: {
          agentName: state.agentName,
          resourceName: state.resourceName,
          instanceAttrs: state.instanceAttrs,
          disabled: state.disabled,
          force,
        },
      }),
  };
};
