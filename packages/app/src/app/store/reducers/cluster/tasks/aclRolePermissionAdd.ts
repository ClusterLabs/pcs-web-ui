import {ActionPayload} from "app/store";
import {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"] & {
  clusterName: string;
  roleId: string;
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
} = {
  clusterName: "",
  roleId: "",
  permissionInfoList: [["read", "id", ""]],
  libCall: initialLibCall,
  showValidationErrors: false,
};

export const aclRolePermissionAdd: AppReducer<typeof initialState> = (
  state = initialState,
  action,
): typeof initialState => {
  switch (action.type) {
    case "CLUSTER.ACL.ROLE.PERMISSION":
      return {
        ...state,
        clusterName: action.payload.clusterName,
      };

    case "CLUSTER.ACL.ROLE.PERMISSION.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.ACL.ROLE.PERMISSION.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
