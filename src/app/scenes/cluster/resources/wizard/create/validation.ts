import { types } from "app/store";

export const isNameTypeValid = (
  wizardState: types.wizardResourceCreate.WizardResourceCreate,
) => wizardState.resourceName.length > 0 && wizardState.agentName.length > 0;

export const areInstanceAttrsValid = (
  agent: types.pcmkAgents.ResourceAgent,
  wizardState: types.wizardResourceCreate.WizardResourceCreate,
) =>
  agent
  && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING")
  && agent.parameters.every(
    p => !p.required || p.name in wizardState.instanceAttrs,
  );
