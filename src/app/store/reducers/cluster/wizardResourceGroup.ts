import { api } from "app/backend";

import { Reducer } from "../tools";

const initialState: {
  groupId: string;
  resourceIdList: string[];
  reports: api.LibReport[];
  showValidationErrors: boolean;
  response: "" | "success" | "fail";
} = {
  groupId: "",
  reports: [],
  resourceIdList: [],
  showValidationErrors: false,
  response: "",
};

export const wizardResourceGroup: Reducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.GROUP.CREATE.UPDATE":
      return { ...state, ...action.payload };
    case "RESOURCE.GROUP.CREATE":
      return { ...state, response: "" };
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
