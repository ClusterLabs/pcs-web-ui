import {AppReducer} from "app/store/reducers/appReducer";
import {ActionPayload} from "app/store/actions";

import {initialState as initialLibCall, libCall} from "./libCall";

type Role = Exclude<
  ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]["role"],
  undefined
>;
type LossPolicy = Exclude<
  ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]["lossPolicy"],
  undefined
>;

const initialState: {
  clusterName: string;
  resourceIdList: string[];
  useCustomId: boolean;
  id: string;
  lossPolicy: LossPolicy;
  role: Role;
  showValidationErrors: boolean;
  libCall: typeof initialLibCall;
  resourceId: string;
  ticket: string;
} = {
  clusterName: "",
  resourceIdList: [],
  useCustomId: false,
  id: "",
  lossPolicy: "stop",
  role: "no limitation",
  showValidationErrors: false,
  libCall: initialLibCall,
  resourceId: "",
  ticket: "",
};

export const constraintTicketCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.TICKET.CREATE.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        resourceIdList: action.payload.resourceIdList,
      };
    case "CONSTRAINT.TICKET.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
        showValidationErrors: false,
      };

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    case "CONSTRAINT.TICKET.CREATE.CLOSE":
      return initialState;

    default:
      return {
        ...state,
        libCall: libCall(state.libCall, action),
      };
  }
};
