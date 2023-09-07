import {AppReducer} from "app/store/reducers/appReducer";
import {ActionPayload} from "app/store/actions";

import {resourceSetCreateFactory} from "./resourceSet";
import {initialState as initialLibCall, libCall} from "./libCall";

type Role = Exclude<
  ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET"]["set"]["role"],
  undefined
>;
type Placement = Exclude<
  ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE"]["placement"],
  undefined
>;
const initialSet: {
  resources: string[];
  sequential: boolean;
  role: Role;
} = {
  resources: [],
  sequential: true,
  role: "no limitation",
};

const {
  resourceSet,
  updateSet,
  initialState: initialResourceSets,
} = resourceSetCreateFactory(initialSet);

const initialState: {
  useCustomId: boolean;
  id: string;
  placement: Placement;
  score: string;
  sets: typeof initialResourceSets;
  showValidationErrors: boolean;
  libCall: typeof initialLibCall;
} = {
  useCustomId: false,
  id: "",
  placement: "together",
  score: "",
  sets: initialResourceSets,
  showValidationErrors: false,
  libCall: initialLibCall,
};

export const constraintColocationSetCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET":
      return {
        ...state,
        sets: updateSet(state.sets, action.payload.index, {
          ...action.payload.set,
          ...(state.sets.length === 1 ? {sequential: true} : {}),
        }),
        showValidationErrors: false,
      };

    case "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {
        ...state,
        sets: resourceSet(state.sets, action),
        libCall: libCall(state.libCall, action),
      };
  }
};
