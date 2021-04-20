import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";

export const notifications: AppReducer<
  ActionPayload["NOTIFICATION.CREATE"][]
> = (state = [], action) => {
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
