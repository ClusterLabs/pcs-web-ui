import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { initialState as initalLibCall, libCall } from "./libCall";

type AssignPayload = ActionPayload["CLUSTER.ACL.SUBJECT_ROLE.ASSIGN"];

const initialState: {
  subjectType: AssignPayload["subjectType"];
  sourceObject: "subject" | "role";
  roleId: string;
  subjectId: string;
  libCall: typeof initalLibCall;
  showValidationErrors: boolean;
} = {
  subjectType: "user",
  sourceObject: "role",
  roleId: "",
  subjectId: "",
  libCall: initalLibCall,
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
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
