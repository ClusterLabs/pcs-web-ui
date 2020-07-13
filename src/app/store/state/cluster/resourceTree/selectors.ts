import * as types from "app/store/types";
import { Selector } from "app/store/types";

type ResourceTreeState = types.resourceTree.ResourceTreeState;
export const resourceTreeGetOpenedItems = (
  clusterUrlName: string,
): Selector<ResourceTreeState["openedItems"]> => state =>
  state.clusterStorage[clusterUrlName]?.resourceTree.openedItems || [];
