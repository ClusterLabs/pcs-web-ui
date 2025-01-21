import type {LibReport} from "app/store/types";
import type {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  clusterName: string;
  topLevelPrimitiveIds: string[];
  groupId: string;
  resourceIdList: string[];
  reports: LibReport[];
  showValidationErrors: boolean;
  response: "" | "success" | "fail";
} = {
  clusterName: "",
  topLevelPrimitiveIds: [],
  groupId: "",
  reports: [],
  resourceIdList: [],
  showValidationErrors: false,
  response: "",
};

export const resourceGroup: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.GROUP.CREATE.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        topLevelPrimitiveIds: action.payload.topLevelPrimitiveIds,
      };
    case "RESOURCE.GROUP.CREATE.UPDATE":
      return {...state, ...action.payload};

    case "RESOURCE.GROUP.CREATE":
      return {...state, response: ""};

    case "RESOURCE.GROUP.CREATE.SUCCESS":
      return {
        ...state,
        response: "success",
        reports: action.payload.reports,
      };

    case "RESOURCE.GROUP.CREATE.FAIL":
      return {
        ...state,
        response: "fail",
        reports: action.payload.reports,
      };

    case "RESOURCE.GROUP.CREATE.CLOSE":
      return initialState;

    default:
      return state;
  }
};
