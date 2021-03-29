import { ClusterStorageItem } from "../types";

import {
  ClusterSelector as TClusterSelector,
  clusterStorageItemSelector,
} from "./selectorsHelpers";

export function getClusterPart<NAME extends keyof ClusterStorageItem>(
  name: NAME,
) {
  return clusterStorageItemSelector(
    clusterStorageItem => clusterStorageItem[name],
  );
}

export const getPcmkAgent = clusterStorageItemSelector(
  (clusterStorageItem, agentName: string) =>
    clusterStorageItem.pcmkAgents[agentName],
);

export const resourceTreeGetOpenedItems = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.resourceTree || [],
);

export const getClusterProperties = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.clusterProperties.data,
);

export const getResourceAgentMap = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.resourceAgentMap.data,
);

export type ClusterSelector<
  ARGS extends unknown[],
  SELECTED,
> = TClusterSelector<ARGS, SELECTED>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractClusterSelector<SELECTOR> = SELECTOR extends ClusterSelector<
  any[],
  infer SELECTED
>
  ? SELECTED
  : never;

export * from "./status";
export * from "./constraints";
