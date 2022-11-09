import {AppReducer} from "app/store/reducers/appReducer";
import {ActionPayload} from "app/store/actions";

import {initialState as initalLibCall, libCall} from "./libCall";

const initialState: {
  subjectType: ActionPayload["CLUSTER.ACL.SUBJECT.CREATE"]["subjectType"];
  subjectId: string;
  roleList: string[];
  libCall: typeof initalLibCall;
  showValidationErrors: boolean;
} = {
  subjectType: "user",
  subjectId: "",
  roleList: [],
  libCall: initalLibCall,
  showValidationErrors: false,
};

export const aclSubjectCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
): typeof initialState => {
  switch (action.type) {
    case "CLUSTER.ACL.SUBJECT.CREATE":
      return {
        ...state,
        subjectType: action.payload.subjectType,
      };

    case "CLUSTER.ACL.SUBJECT.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.ACL.SUBJECT.CREATE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
