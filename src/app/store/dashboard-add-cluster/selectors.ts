import { Selector } from "../types";

import {
  ADD_STATE, AUTH_STATE, NodeName, StateError,
} from "./types";

export const getNodeName: Selector<NodeName> = state =>
  state.addExistingCluster.nodeName;

export const getStepAuthState: Selector<AUTH_STATE> = state =>
  state.addExistingCluster.stepAuthState;

export const getStepAddState: Selector<ADD_STATE> = state =>
  state.addExistingCluster.stepAddState;

export const getStateError: Selector<StateError> = state =>
  state.addExistingCluster.stateError;
