import {AppReducer} from "app/store/reducers/appReducer";

// contains list of opened resources
export const resourceTree: AppReducer<string[]> = (state = [], action) => {
  switch (action.type) {
    case "RESOURCE.TREE.ITEM.TOGGLE":
      return state.includes(action.payload.itemId)
        ? state.filter(id => id !== action.payload.itemId)
        : [...state, action.payload.itemId];

    default:
      return state;
  }
};
