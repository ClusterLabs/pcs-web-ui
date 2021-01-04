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

function hasProperty<O extends Record<string, unknown>, P extends PropertyKey>(
  obj: O,
  prop: P,
): obj is O & Record<P, unknown> {
  /* eslint-disable no-prototype-builtins */
  return obj.hasOwnProperty(prop);
}

const clusterStorage: Reducer<ClusterStorageMap> = (state = {}, action) => {
  if (action.type === "AUTH.REQUIRED") {
    return {};
  }
  if (
    // TODO - DATA_READING.SET_UP has array in payload; make it standard object!
    action.type !== "DATA_READING.SET_UP"
    && hasProperty(action, "payload")
    && hasProperty(action.payload, "clusterUrlName")
  ) {
    const name = action.payload.clusterUrlName;
    return {
      ...state,
      [name]: clusterStorageItem(state[name], action),
    };
  }

  return state;
};

export default clusterStorage;
