import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

type Role = Exclude<
  ActionPayload["CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET"]["set"]["role"],
  undefined
>;
type LossPolicy = Exclude<
  ActionPayload["CONSTRAINT.TICKET.SET.CREATE.UPDATE"]["lossPolicy"],
  undefined
>;

const initialSet: {
  resources: string[];
  role: Role;
} = {
  resources: [],
  role: "no limitation",
};

const initialState: {
  id: string;
  lossPolicy: LossPolicy;
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
  lossPolicy: "stop",
  response: "no-response",
  sets: [initialSet],
  showValidationErrors: false,
  reports: [],
};

export const constraintTicketSetCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.TICKET.SET.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
        showValidationErrors: false,
      };

    case "CONSTRAINT.TICKET.SET.CREATE.CREATE.SET":
      return {
        ...state,
        sets: [...state.sets, initialSet],
      };

    case "CONSTRAINT.TICKET.SET.CREATE.DELETE.SET": {
      const sets = state.sets.filter((_set, i) => i !== action.payload.index);
      return { ...state, sets };
    }

    case "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET": {
      const { index, set: setUpdate } = action.payload;

      const set = { ...state.sets[index], ...setUpdate };
      return {
        ...state,
        sets: state.sets.map((s, i) => (i !== index ? s : set)),
        showValidationErrors: false,
      };
    }

    case "CONSTRAINT.TICKET.SET.CREATE":
      return { ...state, response: "no-response" };

    case "CONSTRAINT.TICKET.SET.CREATE.OK":
      return {
        ...state,
        response: action.payload.success ? "success" : "fail",
        reports: action.payload.reports,
      };

    case "CONSTRAINT.TICKET.SET.CREATE.MOVE.SET": {
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

    case "CONSTRAINT.TICKET.SET.CREATE.ERROR":
      return { ...state, response: "communication-error" };

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
