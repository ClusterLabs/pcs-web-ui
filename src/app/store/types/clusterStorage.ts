import { ClusterStatusService } from "./cluster";
import { AgentsStorage } from "./pcmkAgents";
import { ResourceTreeState } from "./resourceTree";
import { ClusterPropertiesService } from "./clusterProperties";

export type Item = {
  clusterStatus: ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
};

export type Map = Record<string, Item>;
