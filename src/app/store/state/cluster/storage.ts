import { Reducer, combineReducers } from "app/store/redux";

import clusterStatus, { types as clusterStatusTypes } from "./clusterStatus";
import pcmkAgents, { AgentsStorage } from "./pcmkAgents";
import resourceTree, { ResourceTreeState } from "./resourceTree";
import clusterProperties, { ClusterPropertiesService } from "./properties";
import resourceAgentMap, { ResourceAgentListService } from "./resourceAgentMap";
import wizardResourceCreate, {
  WizardResourceCreate,
} from "./wizardResourceCreate";
import wizardNodeAdd, { WizardNodeAdd } from "./wizardNodeAdd";
import fixAuth, { FixAuth } from "./fixAuth";

export type ClusterStorageItem = {
  clusterStatus: clusterStatusTypes.ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
  resourceAgentMap: ResourceAgentListService;
  wizardResourceCreate: WizardResourceCreate;
  wizardNodeAdd: WizardNodeAdd;
  fixAuth: FixAuth;
};

export type ClusterStorageMap = Record<string, ClusterStorageItem>;

const clusterStorageItem = combineReducers<ClusterStorageItem>({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
  wizardResourceCreate,
  wizardNodeAdd,
  fixAuth,
});

const clusterStorage: Reducer<ClusterStorageMap> = (state = {}, action) => {
  if (action.type === "AUTH.REQUIRED") {
    return {};
  }
  if ("id" in action && "cluster" in action.id && action.id.cluster in state) {
    return {
      ...state,
      [action.id.cluster]: clusterStorageItem(state[action.id.cluster], action),
    };
  }

  return state;
};

export default clusterStorage;
