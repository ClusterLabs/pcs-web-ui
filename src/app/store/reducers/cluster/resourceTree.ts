import { Reducer } from "../tools";

// contains list of opened resources
export const resourceTree: Reducer<string[]> = (state = [], action) => {
  switch (action.type) {
    case "RESOURCE.TREE.ITEM.TOGGLE":
      return state.includes(action.payload.itemId)
        ? state.filter(id => id !== action.payload.itemId)
        : [...state, action.payload.itemId];
    default:
      return state;
  }
};
