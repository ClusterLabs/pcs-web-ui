import * as types from "./constants";

const defaultState = [];

export default function notifications(state = defaultState, action) {
  switch (action.type) {
    case types.CREATE:
      return [...state, action.payload];
    case types.DESTROY: return state.filter(n => n.id !== action.payload.id);
    case types.UPDATE:
      return state.map(n => (n.id === action.payload.id ? action.payload : n));
    default: return state;
  }
}

export const getNotifications = state => state;
