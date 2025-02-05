import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionPayload} from "app/store/actions";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  clusterName: string;
  subjectType: ActionPayload["CLUSTER.ACL.SUBJECT.CREATE"]["subjectType"];
  roleMap: ActionPayload["CLUSTER.ACL.SUBJECT.CREATE"]["roleMap"];
  subjectId: string;
  roleList: string[];
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
} = {
  clusterName: "",
  subjectType: "user",
  roleMap: {},
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
        roleMap: action.payload.roleMap,
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
