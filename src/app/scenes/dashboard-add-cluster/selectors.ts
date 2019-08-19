import { Selector, RootState, RootStateKey } from "app/core/types";

import {
  NodeName,
  StateError,
  AUTH_STATE,
  ADD_STATE,
  DashboardAddClusterPageState,
} from "./types";

const localState: Selector<RootState, DashboardAddClusterPageState> = (
  state => state[RootStateKey.AddExistingCluster]
);

export const getNodeName: Selector<RootState, NodeName> = (
  state => localState(state).nodeName
);

export const getStepAuthState: Selector<RootState, AUTH_STATE> = (
  state => localState(state).stepAuthState
);

export const getStepAddState: Selector<RootState, ADD_STATE> = (
  state => localState(state).stepAddState
);

export const getStateError: Selector<RootState, StateError> = (
  state => localState(state).stateError
);
