import { ClusterStatusService } from "./cluster";
import { AgentsStorage } from "./pcmkAgents";
import { ResourceTreeState } from "./resourceTree";

export type Item = {
  clusterStatus: ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
};

export type Map = Record<string, Item>;
