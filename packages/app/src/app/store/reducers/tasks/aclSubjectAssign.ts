import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionPayload} from "app/store/actions";

import {initialState as initialLibCall, libCall} from "./libCall";

type AssignPayload = ActionPayload["CLUSTER.ACL.SUBJECT_ROLE.ASSIGN"];

const initialState: {
  clusterName: string;
  subjectType: AssignPayload["subjectType"];
  sourceObject: "subject" | "role";
  roleId: string;
  subjectId: string;
  assignableItems: string[];
  alreadyAssigned: string[];
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
} = {
  clusterName: "",
  subjectType: "user",
  sourceObject: "role",
  roleId: "",
  subjectId: "",
  assignableItems: [],
  alreadyAssigned: [],
  libCall: initialLibCall,
  showValidationErrors: false,
};

export const aclSubjectAssign: AppReducer<typeof initialState> = (
  state = initialState,
  action,
): typeof initialState => {
  switch (action.type) {
    case "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN":
      return {
        ...state,
        ...action.payload,
        sourceObject: "roleId" in action.payload ? "role" : "subject",
      };

    case "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
