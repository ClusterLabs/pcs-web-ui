import {AppReducer} from "app/store/reducers/appReducer";
import {ActionPayload} from "app/store/actions";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  subjectType: ActionPayload["CLUSTER.ACL.SUBJECT.CREATE"]["subjectType"];
  clusterName: string;
  subjectId: string;
  roleList: string[];
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
} = {
  subjectType: "user",
  clusterName: "",
  subjectId: "",
  roleList: [],
  libCall: initialLibCall,
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
        clusterName: action.payload.clusterName,
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
