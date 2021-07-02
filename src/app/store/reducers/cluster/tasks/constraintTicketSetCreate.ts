import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { resourceSetCreateFactory } from "./resourceSet";
import { initialState as initalLibCall, libCall } from "./libCall";

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
  ticket: string;
  useCustomId: boolean;
  id: string;
  lossPolicy: LossPolicy;
  sets: typeof initialResourceSets;
  showValidationErrors: boolean;
  libCall: typeof initalLibCall;
} = {
  ticket: "",
  useCustomId: false,
  id: "",
  lossPolicy: "stop",
  sets: initialResourceSets,
  showValidationErrors: false,
  libCall: initalLibCall,
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

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    case "CONSTRAINT.TICKET.SET.CREATE.CLOSE":
      return initialState;

    default:
      return {
        ...state,
        sets: resourceSet(state.sets, action),
        libCall: libCall(state.libCall, action),
      };
  }
};
