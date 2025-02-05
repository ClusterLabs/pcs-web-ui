import type {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  isLoaded: boolean;
  isHaclient: boolean;
  isSuperuser: boolean;
} = {
  isLoaded: false,
  isHaclient: false,
  isSuperuser: false,
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
        isSuperuser: action.payload.isSuperuser,
      };

    case "USER.SUPERUSER_CHANGED":
      return {
        ...state,
        isSuperuser: action.payload.isSuperuser,
      };

    default:
      return state;
  }
};
