import { AppReducer } from "app/store/reducers/appReducer";

type ResourceSetSettings = {
  resources: string[];
};

const initialSet: ResourceSetSettings = {
  resources: [],
};

const initialState: {
  id: string;
  kind: "Optional" | "Mandatory" | "Serialize";
  symmetrical: boolean;
  sets: ResourceSetSettings[];
} = {
  id: "",
  kind: "Mandatory",
  symmetrical: true,
  sets: [initialSet],
};
export const constraintOrderSetCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET":
      return {
        ...state,
        sets: [...state.sets, initialSet],
      };

    case "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET":
      return {
        ...state,
        sets: state.sets.filter((_set, i) => i !== action.payload.index),
      };
    default:
      return state;
  }
};
