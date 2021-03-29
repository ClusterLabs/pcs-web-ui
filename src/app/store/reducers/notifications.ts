import { ActionPayload } from "app/store/actions";

import { Reducer } from "./tools";

export const notifications: Reducer<ActionPayload["NOTIFICATION.CREATE"][]> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "NOTIFICATION.CREATE":
      return [...state, action.payload];
    case "NOTIFICATION.DESTROY":
      return state.filter(n => n.id !== action.payload.id);
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};
