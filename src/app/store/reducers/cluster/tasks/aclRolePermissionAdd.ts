import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

const initialState: {
  roleId: string;
  permissionInfoList: string[];
  libCall: typeof initalLibCall;
  showValidationErrors: boolean;
} = {
  roleId: "",
  permissionInfoList: [],
  libCall: initalLibCall,
  showValidationErrors: false,
};

export const aclRolePermissionAdd: AppReducer<typeof initialState> = (
  state = initialState,
  action,
): typeof initialState => {
  switch (action.type) {
    case "CLUSTER.ACL.ROLE.PERMISSION.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.ACL.ROLE.PERMISSION.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
