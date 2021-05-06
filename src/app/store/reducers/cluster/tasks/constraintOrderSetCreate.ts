import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

type Action = Exclude<
  ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET"]["set"]["action"],
  undefined
>;

const initialSet: {
  resources: string[];
  action: Action;
  sequential: boolean;
  requireAll: boolean;
} = {
  resources: [],
  action: "start",
  sequential: true,
  requireAll: true,
};

const initialState: {
  id: string;
  sets: typeof initialSet[];
  showValidationErrors: boolean;
  reports: LibReport[];
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
} = {
  id: "",
  response: "no-response",
  sets: [initialSet],
  showValidationErrors: false,
  reports: [],
};

const setForOnlyOne = (set: typeof initialSet) => {
  // disabled sequential does not make sense for only one set
  // disabled requiereAll does not make sense if sequential is enabled
  set.sequential = true;
  set.requireAll = true;
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
        showValidationErrors: false,
      };

    case "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET":
      return {
        ...state,
        sets: [...state.sets, initialSet],
      };

    case "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET": {
      const sets = state.sets.filter((_set, i) => i !== action.payload.index);
      if (sets.length === 1) {
        setForOnlyOne(sets[0]);
      }
      return { ...state, sets };
    }

    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET": {
      const { index, set: setUpdate } = action.payload;

      const set = { ...state.sets[index], ...setUpdate };
      if (state.sets.length === 1) {
        setForOnlyOne(set);
      } else if (set.sequential) {
        // disabled requiereAll does not make sense if sequential is enabled
        set.requireAll = true;
      }

      return {
        ...state,
        sets: state.sets.map((s, i) => (i !== index ? s : set)),
        showValidationErrors: false,
      };
    }

    case "CONSTRAINT.ORDER.SET.CREATE":
      return { ...state, response: "no-response" };

    case "CONSTRAINT.ORDER.SET.CREATE.OK":
      return {
        ...state,
        response: action.payload.success ? "success" : "fail",
        reports: action.payload.reports,
      };

    case "CONSTRAINT.ORDER.SET.CREATE.ERROR":
      return { ...state, response: "communication-error" };

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };
    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
