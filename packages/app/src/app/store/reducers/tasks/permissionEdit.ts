import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionMap, ActionPayload} from "app/store/actions";

type UpdatePayload = ActionPayload["CLUSTER.PERMISSION.EDIT.UPDATE"];
type InitPayload = ActionPayload["CLUSTER.PERMISSIONS.EDIT"];
type InitialPermission = Extract<InitPayload, {type: "update"}>["permission"];
type Competence = "read" | "write" | "grant" | "full";

const initialState: Required<UpdatePayload> & {
  clusterName: string;
  currentPermissionList: InitPayload["currentPermissionList"];
  initialPermission: InitialPermission | null;
  call: {
    response: "" | "sending" | "ok" | "fail";
    resultMessage: string;
  };
  showValidationErrors: boolean;
} = {
  clusterName: "",
  currentPermissionList: [],
  initialPermission: null,
  name: "",
  type: "user",
  read: true,
  write: false,
  grant: false,
  full: false,
  call: {
    response: "",
    resultMessage: "",
  },
  showValidationErrors: false,
};

const initToState = (initPayload: InitPayload) => {
  if (initPayload.type === "create") {
    return {
      ...initialState,
      clusterName: initPayload.clusterName,
      currentPermissionList: initPayload.currentPermissionList,
    };
  }

  const {permission} = initPayload;
  return {
    ...initialState,
    clusterName: initPayload.clusterName,
    currentPermissionList: initPayload.currentPermissionList,
    initialPermission: permission,
    name: permission.name,
    type: permission.type,
    read: permission.allow.includes("read"),
    write: permission.allow.includes("write"),
    grant: permission.allow.includes("grant"),
    full: permission.allow.includes("full"),
  };
};

const check = (
  state: typeof initialState,
  action: ActionMap["CLUSTER.PERMISSION.EDIT.UPDATE"],
  competence: Competence,
  presentInCompetence: Competence[],
): boolean => {
  if (competence in action.payload) {
    // typescript thinks it can be undefined
    return action.payload[competence] === true;
  }
  if (presentInCompetence.some(c => c in action.payload && action.payload[c])) {
    return true;
  }
  return state[competence];
};

export const permissionEdit: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PERMISSION.EDIT.UPDATE":
      return {
        ...state,
        ...action.payload,
        read: check(state, action, "read", ["write", "full"]),
        write: check(state, action, "write", ["full"]),
        grant: check(state, action, "grant", ["full"]),
      };

    case "CLUSTER.PERMISSIONS.EDIT":
      return initToState(action.payload);

    case "CLUSTER.PERMISSIONS.SAVE":
      return {
        ...state,
        call: {
          response: "sending",
          resultMessage: "",
        },
      };

    case "CLUSTER.PERMISSIONS.SAVE.OK":
      return {
        ...state,
        call: {
          response: "ok",
          resultMessage: "",
        },
      };

    case "CLUSTER.PERMISSIONS.SAVE.ERROR":
      return {
        ...state,
        call: {
          response: "fail",
          resultMessage: action.payload.message,
        },
      };

    case "CLUSTER.PERMISSIONS.SAVE.ERROR.RECOVER":
      return {
        ...state,
        call: {
          response: "",
          resultMessage: "",
        },
      };

    case "CLUSTER.PERMISSIONS.EDIT.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return state;
  }
};
