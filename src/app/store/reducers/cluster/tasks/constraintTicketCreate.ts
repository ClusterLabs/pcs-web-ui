import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { initialState as initalLibCall, libCall } from "./libCall";

type Role = Exclude<
  ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]["role"],
  undefined
>;
type LossPolicy = Exclude<
  ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]["lossPolicy"],
  undefined
>;

const initialState: {
  useCustomId: boolean;
  id: string;
  lossPolicy: LossPolicy;
  role: Role;
  showValidationErrors: boolean;
  libCall: typeof initalLibCall;
  resourceId: string;
  ticket: string;
} = {
  useCustomId: false,
  id: "",
  lossPolicy: "stop",
  role: "no limitation",
  showValidationErrors: false,
  libCall: initalLibCall,
  resourceId: "",
  ticket: "",
};

export const constraintTicketCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.TICKET.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
        showValidationErrors: false,
      };

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    case "CONSTRAINT.TICKET.SET.CREATE.CLOSE":
      return initialState;

    default:
      return {
        ...state,
        libCall: libCall(state.libCall, action),
      };
  }
};
