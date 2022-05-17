import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";

export const notifications: AppReducer<ActionPayload["NOTIFICATION.CREATE"][]> =
  (state = [], action) => {
    switch (action.type) {
      case "NOTIFICATION.CREATE":
        return [...state, action.payload];

      case "NOTIFICATION.DESTROY":
        return state.filter(n => n.id !== action.payload.id);

      case "NOTIFICATION.DESTROY.ALL": {
        state.splice(0, state.length);
        return state;
      }

      case "NOTIFICATION.HIDE":
        return state.map((n) => {
          if (n.id === action.payload.id) {
            n.isVisible = false;
          }
          return n;
        });

      case "NOTIFICATION.READ":
        return state.map((n) => {
          if (n.id === action.payload.id) {
            n.isRead = true;
          }
          return n;
        });

      case "AUTH.REQUIRED":
        return [];

      default:
        return state;
    }
  };
