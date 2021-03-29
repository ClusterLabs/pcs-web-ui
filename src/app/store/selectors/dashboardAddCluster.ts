import { Root } from "./types";

export const addClusterGetNodeName = (state: Root) =>
  state.addExistingCluster.nodeName;

export const addClusterGetStepAuthState = (state: Root) =>
  state.addExistingCluster.stepAuthState;

export const addClusterGetAuthProcessId = (state: Root) =>
  state.addExistingCluster.authProcessId;

export const addClusterGetStepAddState = (state: Root) =>
  state.addExistingCluster.stepAddState;

export const addClusterGetStateError = (state: Root) =>
  state.addExistingCluster.stateError;
