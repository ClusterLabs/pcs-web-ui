import { Selector } from "../types";
import { ResourceTreeState } from "./types";


export const getOpenedItems: Selector<ResourceTreeState["openedItems"]> = (
  state => state.resourceTree.openedItems
);
