import type {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  clusterName: string;
  originalPropertyMap: Record<string, string>;
  modifiedPropertyMap: Record<string, string>;
  showValidationErrors: boolean;
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
} = {
  clusterName: "",
  originalPropertyMap: {},
  modifiedPropertyMap: {},
  showValidationErrors: false,
  response: "",
  resultMessage: "",
};

export const propertiesUpdate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PROPERTIES.UPDATE.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        originalPropertyMap: action.payload.propertyMap,
      };
    case "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM":
      return {
        ...state,
        modifiedPropertyMap: {
          ...state.modifiedPropertyMap,
          [action.payload.name]: action.payload.value,
        },
      };
    case "CLUSTER.PROPERTIES.UPDATE.CLOSE":
      return initialState;
    case "CLUSTER.PROPERTIES.UPDATE":
      return {
        ...state,
        response: "",
        resultMessage: "",
      };
    case "CLUSTER.PROPERTIES.UPDATE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };
    case "CLUSTER.PROPERTIES.UPDATE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
      };
    case "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER":
      return {
        ...state,
        response: "",
        resultMessage: "",
      };

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};
    default:
      return state;
  }
};
