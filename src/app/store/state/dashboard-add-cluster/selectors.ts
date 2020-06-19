import { types } from "app/store";
import { Selector } from "app/store/types";

export const getNodeName: Selector<types.addCluster.NodeName> = state =>
  state.addExistingCluster.nodeName;

export const getStepAuthState: Selector<types.addCluster.AUTH_STATE> = state =>
  state.addExistingCluster.stepAuthState;

export const getStepAddState: Selector<types.addCluster.ADD_STATE> = state =>
  state.addExistingCluster.stepAddState;

export const getStateError: Selector<types.addCluster.StateError> = state =>
  state.addExistingCluster.stateError;
