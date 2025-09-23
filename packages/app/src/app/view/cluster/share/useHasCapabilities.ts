import {useLoadedCluster} from "./LoadedClusterContext";

// Make union, when more capabilities arrive:
type Capability = "pcmk.resource.update-meta.stonith";

export const useHasCapabilities = (capabilities: Capability[]) => {
  const cluster = useLoadedCluster();
  return capabilities.every(c => cluster.pcsdCapabilities.includes(c));
};
