import {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  isLoaded: boolean;
  isHaclient: boolean;
} = {
  isLoaded: false,
  isHaclient: false,
};

export const user: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "USER.LOADED":
      return {
        ...state,
        isLoaded: true,
        isHaclient: action.payload.isHaclient,
      };

    default:
      return state;
  }
};
