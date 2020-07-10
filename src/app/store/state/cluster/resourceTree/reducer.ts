import { Reducer, combineReducers } from "redux";

import { types } from "app/store";
import { Action } from "app/store/actions";

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
