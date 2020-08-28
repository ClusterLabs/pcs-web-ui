import { selectors, useSelector } from "app/store";

import { useClusterSelector } from "app/view";

export const useValidation = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const agent = useSelector(
    selectors.getPcmkAgent(clusterUrlName, wizardState.agentName),
  );

  const isAgentLoaded =
    agent
    && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING");

  return {
    isNameTypeValid:
      wizardState.resourceName.length > 0 && wizardState.agentName.length > 0,
    areInstanceAttrsValid:
      isAgentLoaded
      && agent.parameters.every(
        p => !p.required || p.name in wizardState.instanceAttrs,
      ),
    isAgentLoaded,
  };
};
