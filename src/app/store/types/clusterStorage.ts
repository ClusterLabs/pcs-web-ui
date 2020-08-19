import { ClusterStatusService } from "./cluster";
import { AgentsStorage } from "./pcmkAgents";
import { ResourceTreeState } from "./resourceTree";
import { ClusterPropertiesService } from "./clusterProperties";
import { ResourceAgentListService } from "./resourceAgentList";
import { WizardResourceCreate } from "./wizardResourceCreate";

export type Item = {
  clusterStatus: ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
  resourceAgentMap: ResourceAgentListService;
  wizardResourceCreate: WizardResourceCreate;
};

export type Map = Record<string, Item>;
