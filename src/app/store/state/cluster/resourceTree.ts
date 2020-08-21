import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";

export interface ResourceTreeState {
  openedItems: string[];
}

const openedItems: Reducer<ResourceTreeState["openedItems"], Action> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "RESOURCE_TREE.ITEM.TOGGLE":
      return state.includes(action.payload.itemId)
        ? state.filter(id => id !== action.payload.itemId)
        : [...state, action.payload.itemId];
    default:
      return state;
  }
};

export default combineReducers<ResourceTreeState>({
  openedItems,
});
