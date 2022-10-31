import {AppReducer} from "app/store/reducers/appReducer";

export const username: AppReducer<string> = (state = "", action) => {
  switch (action.type) {
    case "USERNAME.SET":
      return action.payload.username;

    default:
      return state;
  }
};
