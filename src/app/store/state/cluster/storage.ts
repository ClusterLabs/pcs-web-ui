import { Reducer, combineReducers } from "app/store/redux";

import clusterStatus, { types as clusterStatusTypes } from "./clusterStatus";
import pcmkAgents, { AgentsStorage } from "./pcmkAgents";
import resourceTree, { ResourceTreeState } from "./resourceTree";
import clusterProperties, { ClusterPropertiesService } from "./properties";
import resourceAgentMap, { ResourceAgentListService } from "./resourceAgentMap";
import wizardResourceCreate, {
  WizardResourceCreate,
} from "./wizardResourceCreate";

export type ClusterStorageItem = {
  clusterStatus: clusterStatusTypes.ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
  resourceAgentMap: ResourceAgentListService;
  wizardResourceCreate: WizardResourceCreate;
};

export type ClusterStorageMap = Record<string, ClusterStorageItem>;

const clusterStorageItem = combineReducers<ClusterStorageItem>({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
  wizardResourceCreate,
});

const clusterStorage: Reducer<ClusterStorageMap> = (state = {}, action) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
    case "CLUSTER_DATA.FETCH.SUCCESS":
    case "CLUSTER_DATA.FETCH.FAILED":
    case "RESOURCE_AGENT.LOAD":
    case "RESOURCE_AGENT.LOAD.SUCCESS":
    case "RESOURCE_AGENT.LOAD.FAILED":
    case "FENCE_AGENT.LOAD":
    case "FENCE_AGENT.LOAD.SUCCESS":
    case "FENCE_AGENT.LOAD.FAILED":
    case "RESOURCE_TREE.ITEM.TOGGLE":
    case "CLUSTER_PROPERTIES.LOAD":
    case "CLUSTER_PROPERTIES.LOAD.SUCCESS":
    case "CLUSTER_PROPERTIES.LOAD.FAILED":
    case "RESOURCE_AGENT_LIST.LOAD":
    case "RESOURCE_AGENT_LIST.LOAD.SUCCESS":
    case "RESOURCE_AGENT_LIST.LOAD.FAILED":
    case "RESOURCE.PRIMITIVE.CREATE":
    case "RESOURCE.PRIMITIVE.CREATE.SET_AGENT_NAME":
    case "RESOURCE.PRIMITIVE.CREATE.SET_RESOURCE_NAME":
    case "RESOURCE.PRIMITIVE.CREATE.SET_INSTANCE_ATTRIBUTE":
    case "RESOURCE.PRIMITIVE.CREATE.SUCCESS":
    case "RESOURCE.PRIMITIVE.CREATE.FAILED":
    case "RESOURCE.PRIMITIVE.CREATE.CLOSE":
      /* eslint-disable no-case-declarations */
      const name = action.payload.clusterUrlName;
      return {
        ...state,
        [name]: clusterStorageItem(state[name], action),
      };
    case "AUTH.REQUIRED":
      return {};
    default:
      return state;
  }
};

export default clusterStorage;
