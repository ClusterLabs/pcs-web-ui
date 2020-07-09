import { ClusterStatusService } from "./cluster";
import { AgentsStorage } from "./pcmkAgents";

export type Item = {
  clusterStatus: ClusterStatusService;
  pcmkAgents: AgentsStorage;
};

export type Map = Record<string, Item>;
