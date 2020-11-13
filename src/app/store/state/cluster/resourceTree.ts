import { Reducer, combineReducers } from "app/store/redux";

export interface ResourceTreeState {
  openedItems: string[];
}

const openedItems: Reducer<ResourceTreeState["openedItems"]> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "RESOURCE.TREE.ITEM.TOGGLE":
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
