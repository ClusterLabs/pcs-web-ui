import { ActionMap, selectors, useSelector } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view";

const useAgent = (clusterUrlName: string, agentName: string) => {
  const agent = useSelector(selectors.getPcmkAgent(clusterUrlName, agentName));
  return {
    agent,
    isAgentLoaded:
      agent
      && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
  };
};

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "resource-create",
    selectors.getWizardResourceCreateState,
  );
  const { clusterUrlName, state, dispatch } = clusterWizard;
  const [groupList] = useClusterSelector(selectors.getGroups);
  const { agent, isAgentLoaded } = useAgent(clusterUrlName, state.agentName);

  return {
    ...clusterWizard,
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
      clusterWizard.close();
      dispatch({
        type: "RESOURCE.CREATE.CLOSE",
        payload: { clusterUrlName },
      });
    },

    updateState: (
      state: ActionMap["RESOURCE.CREATE.UPDATE"]["payload"]["state"],
    ) => {
      dispatch({
        type: "RESOURCE.CREATE.UPDATE",
        payload: {
          clusterUrlName,
          state,
        },
      });
    },
  };
};
