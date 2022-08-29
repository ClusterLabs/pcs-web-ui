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

    case "NOTIFICATION.DESTROY.ALL": {
      return [];
    }

    case "NOTIFICATION.REMOVE_FROM_TOAST":
      return state.map(n => ({
        ...n,
        inToast: n.id === action.payload.id ? false : n.inToast,
      }));

    case "NOTIFICATION.READ":
      return state.map(n => ({
        ...n,
        isRead: n.id === action.payload.id ? true : n.isRead,
      }));

    case "NOTIFICATION.READ.ALL": {
      return state.map(n => ({
        ...n,
        isRead: true,
      }));
    }

    case "AUTH.REQUIRED":
      return [];

    default:
      return state;
  }
};
