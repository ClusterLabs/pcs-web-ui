import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { resourceSetCreateFactory } from "./resourceSet";

type Role = Exclude<
  ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET"]["set"]["role"],
  undefined
>;
const initialSet: {
  resources: string[];
  sequential: boolean;
  role: Role;
} = {
  resources: [],
  sequential: true,
  role: "no limitation",
};

const {
  resourceSet,
  updateSet,
  initialState: initialResourceSets,
} = resourceSetCreateFactory(initialSet);

const initialState: {
  useCustomId: boolean;
  id: string;
  score: string;
  sets: typeof initialResourceSets;
  showValidationErrors: boolean;
  reports: LibReport[];
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
} = {
  useCustomId: false,
  id: "",
  score: "",
  response: "no-response",
  sets: initialResourceSets,
  showValidationErrors: false,
  reports: [],
};

export const constraintColocationSetCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload,
        showValidationErrors: false,
      };
    }

    case "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET":
      return {
        ...state,
        sets: updateSet(state.sets, action.payload.index, {
          ...action.payload.set,
          ...(state.sets.length === 1 ? { sequential: true } : {}),
        }),
        showValidationErrors: false,
      };

    case "CONSTRAINT.COLOCATION.SET.CREATE":
      return { ...state, response: "no-response" };

    case "CONSTRAINT.COLOCATION.SET.CREATE.OK":
      return {
        ...state,
        response: action.payload.success ? "success" : "fail",
        reports: action.payload.reports,
      };

    case "CONSTRAINT.COLOCATION.SET.CREATE.ERROR":
      return { ...state, response: "communication-error" };

    case "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE":
      return initialState;

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, sets: resourceSet(state.sets, action) };
  }
};
