import { clusterSelector } from "./selectorsHelpers";

export const getWizardResourceCreateState = clusterSelector(
  clusterStorageItem => clusterStorageItem.wizardResourceCreate,
);

export const getPcmkAgent = clusterSelector(
  (clusterStorageItem, agentName: string) =>
    clusterStorageItem.pcmkAgents[agentName],
);

export const resourceTreeGetOpenedItems = clusterSelector(
  clusterStorageItem => clusterStorageItem.resourceTree.openedItems || [],
);

export const getClusterProperties = clusterSelector(
  clusterStorageItem => clusterStorageItem.clusterProperties.data,
);

export const getResourceAgentMap = clusterSelector(
  clusterStorageItem => clusterStorageItem.resourceAgentMap.data,
);

export * from "./status";
export * from "./constraints";
