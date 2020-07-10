import { types } from "app/store";
import { Selector } from "app/store/types";

type ResourceTreeState = types.resourceTree.ResourceTreeState;
export const resourceTreeGetOpenedItems = (
  clusterUrlName: string,
): Selector<ResourceTreeState["openedItems"]> => state =>
  state.clusterStorage[clusterUrlName]?.resourceTree.openedItems || [];
