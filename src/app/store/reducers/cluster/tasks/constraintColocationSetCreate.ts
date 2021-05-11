import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

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

const initialState: {
  useCustomId: boolean;
  id: string;
  score: string;
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
  useCustomId: false,
  id: "",
  score: "",
  response: "no-response",
  sets: [initialSet],
  showValidationErrors: false,
  reports: [],
};

const setForOnlyOne = (set: typeof initialSet) => {
  // disabled sequential does not make sense for only one set
  // disabled requiereAll does not make sense if sequential is enabled
  set.sequential = true;
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

    case "CONSTRAINT.COLOCATION.SET.CREATE.CREATE.SET":
      return {
        ...state,
        sets: [...state.sets, initialSet],
      };

    case "CONSTRAINT.COLOCATION.SET.CREATE.DELETE.SET": {
      const sets = state.sets.filter((_set, i) => i !== action.payload.index);
      if (sets.length === 1) {
        setForOnlyOne(sets[0]);
      }
      return { ...state, sets };
    }

    case "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET": {
      const { index, set: setUpdate } = action.payload;

      const set = { ...state.sets[index], ...setUpdate };
      if (state.sets.length === 1) {
        setForOnlyOne(set);
      }

      return {
        ...state,
        sets: state.sets.map((s, i) => (i !== index ? s : set)),
        showValidationErrors: false,
      };
    }

    case "CONSTRAINT.COLOCATION.SET.CREATE":
      return { ...state, response: "no-response" };

    case "CONSTRAINT.COLOCATION.SET.CREATE.OK":
      return {
        ...state,
        response: action.payload.success ? "success" : "fail",
        reports: action.payload.reports,
      };

    case "CONSTRAINT.COLOCATION.SET.CREATE.MOVE.SET": {
      const sets = state.sets;
      const i = action.payload.index;
      if (action.payload.direction === "up") {
        if (i < 0 || i >= state.sets.length) {
          return state;
        }
        [sets[i], sets[i - 1]] = [sets[i - 1], sets[i]];
      } else {
        if (i >= state.sets.length - 1) {
          return state;
        }
        [sets[i], sets[i + 1]] = [sets[i + 1], sets[i]];
      }
      return {
        ...state,
        sets,
      };
    }

    case "CONSTRAINT.COLOCATION.SET.CREATE.ERROR":
      return { ...state, response: "communication-error" };

    case "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE":
      return initialState;

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
