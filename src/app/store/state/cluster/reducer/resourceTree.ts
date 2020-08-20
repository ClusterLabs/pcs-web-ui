import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

const openedItems: Reducer<
  types.resourceTree.ResourceTreeState["openedItems"],
  Action
> = (state = [], action) => {
  switch (action.type) {
    case "RESOURCE_TREE.ITEM.TOGGLE":
      return state.includes(action.payload.itemId)
        ? state.filter(id => id !== action.payload.itemId)
        : [...state, action.payload.itemId];
    default:
      return state;
  }
};

export default combineReducers<types.resourceTree.ResourceTreeState>({
  openedItems,
});
