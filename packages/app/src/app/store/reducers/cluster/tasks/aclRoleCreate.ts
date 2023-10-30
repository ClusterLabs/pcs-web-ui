import {ActionPayload} from "app/store";
import {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: Required<
  ActionPayload["CLUSTER.ACL.ROLE.CREATE.UPDATE"]
> & {
  clusterName: string;
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
} = {
  roleId: "",
  permissionInfoList: [["read", "id", ""]],
  description: "",
  clusterName: "",
  libCall: initialLibCall,
  showValidationErrors: false,
};

export const aclRoleCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
): typeof initialState => {
  switch (action.type) {
    case "CLUSTER.ACL.ROLE.CREATE":
      return {
        ...state,
        clusterName: action.payload.clusterName,
      };

    case "CLUSTER.ACL.ROLE.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.ACL.ROLE.CREATE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
