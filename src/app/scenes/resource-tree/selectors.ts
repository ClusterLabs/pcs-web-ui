import { Selector, RootState } from "app/core/types";

import { ResourceTreeState } from "./types";

const localState: Selector<RootState, ResourceTreeState> = (
  state => state.resourceTree
);

export const getOpenedItems: Selector<
  RootState,
  ResourceTreeState["openedItems"]
> = state => localState(state).openedItems;
