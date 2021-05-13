import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { resourceSetCreateFactory } from "./resourceSet";

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

const {
  resourceSet,
  updateSet,
  initialState: initialResourceSets,
} = resourceSetCreateFactory(initialSet);

const initialState: {
  useCustomId: boolean;
  id: string;
  lossPolicy: LossPolicy;
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
  lossPolicy: "stop",
  response: "no-response",
  sets: initialResourceSets,
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

    case "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET": {
      return {
        ...state,
        sets: updateSet(state.sets, action.payload.index, action.payload.set),
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

    case "CONSTRAINT.TICKET.SET.CREATE.ERROR":
      return { ...state, response: "communication-error" };

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    case "CONSTRAINT.TICKET.SET.CREATE.CLOSE":
      return initialState;

    default:
      return { ...state, sets: resourceSet(state.sets, action) };
  }
};
