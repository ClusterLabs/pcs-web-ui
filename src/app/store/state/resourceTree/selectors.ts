import { types } from "app/store";
import { Selector } from "app/store/types";

type ResourceTreeState = types.resourceTree.ResourceTreeState;
export const getOpenedItems: Selector<ResourceTreeState["openedItems"]> = state =>
  state.resourceTree.openedItems;
