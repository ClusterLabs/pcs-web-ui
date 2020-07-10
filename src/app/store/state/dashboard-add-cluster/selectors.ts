import * as types from "app/store/types";
import { Selector } from "app/store/types";

/* eslint-disable max-len */
export const addClusterGetNodeName: Selector<types.addCluster.NodeName> = state =>
  state.addExistingCluster.nodeName;

export const addClusterGetStepAuthState: Selector<types.addCluster.AUTH_STATE> = state =>
  state.addExistingCluster.stepAuthState;

export const addClusterGetStepAddState: Selector<types.addCluster.ADD_STATE> = state =>
  state.addExistingCluster.stepAddState;

export const addClusterGetStateError: Selector<types.addCluster.StateError> = state =>
  state.addExistingCluster.stateError;
