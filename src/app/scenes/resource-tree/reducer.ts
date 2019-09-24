import { Reducer, combineReducers } from "redux";
import * as ResourceTreeAction from "./actions";
import { ResourceTreeState } from "./types";

const openedItems: Reducer<ResourceTreeState["openedItems"], (
  | ResourceTreeAction.ToggleItem
)> = (state = [], action) => {
  switch (action.type) {
    case "RESOURCE_TREE.ITEM.TOGGLE": return (
      state.includes(action.payload.itemId)
        ? state.filter(id => id !== action.payload.itemId)
        : [...state, action.payload.itemId]
    );
    default: return state;
  }
};

export default combineReducers<ResourceTreeState>({
  openedItems,
});
