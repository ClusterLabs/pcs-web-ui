import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { initialState as initialCall } from "./constraintSingleCall";

type UpdatePayload = ActionPayload["CLUSTER.PERMISSION.EDIT.UPDATE"];
type InitPayload = ActionPayload["CLUSTER.PERMISSIONS.EDIT"];
type InitialPermission = Extract<InitPayload, { type: "update" }>["permission"];

const initialState: Required<UpdatePayload> & {
  initialPermission: InitialPermission | null;
  call: typeof initialCall;
  showValidationErrors: boolean;
} = {
  initialPermission: null,
  name: "",
  type: "user",
  call: initialCall,
  read: true,
  write: false,
  grant: false,
  full: false,
  showValidationErrors: false,
};

const initToState = (initPayload: InitPayload) => {
  if (initPayload.type === "create") {
    return initialState;
  }

  const { permission } = initPayload;
  return {
    ...initialState,
    initialPermission: permission,
    name: permission.name,
    type: permission.type,
    read: permission.allow.includes("read"),
    write: permission.allow.includes("write"),
    grant: permission.allow.includes("grant"),
    full: permission.allow.includes("full"),
  };
};

export const permissionEdit: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PERMISSION.EDIT.UPDATE":
      return { ...state, ...action.payload };

    case "CLUSTER.PERMISSIONS.EDIT":
      return initToState(action.payload);

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
