import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import { resourceSetCreateFactory } from "./resourceSet";

type Action = Exclude<
  ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET"]["set"]["action"],
  undefined
>;

const initialSet: {
  resources: string[];
  action: Action;
  sequential: boolean;
  requireAll: boolean;
} = {
  resources: [],
  action: "no limitation",
  sequential: true,
  requireAll: true,
};

const {
  resourceSet,
  updateSet,
  initialState: initialResourceSets,
} = resourceSetCreateFactory(initialSet);

const initialState: {
  useCustomId: boolean;
  id: string;
  sets: typeof initialResourceSets;
  showValidationErrors: boolean;
  reports: LibReport[];
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
} = {
  useCustomId: false,
  id: "",
  response: "no-response",
  sets: initialResourceSets,
  showValidationErrors: false,
  reports: [],
};

const onlyOneSettings = {
  // disabled sequential does not make sense for only one set
  // disabled requiereAll does not make sense if sequential is enabled
  sequential: true,
  requireAll: true,
};

export const constraintOrderSetCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload,
        showValidationErrors: false,
      };
    }

    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET": {
      let contextUpdate = {};
      if (state.sets.length === 1) {
        contextUpdate = onlyOneSettings;
      } else if (action.payload.set.sequential) {
        // disabled requiereAll does not make sense if sequential is enabled
        contextUpdate = { requireAll: true };
      }

      return {
        ...state,
        sets: updateSet(state.sets, action.payload.index, {
          ...action.payload.set,
          ...contextUpdate,
        }),
        showValidationErrors: false,
      };
    }

    case "CONSTRAINT.ORDER.SET.CREATE":
      return { ...state, response: "no-response" };

    case "CONSTRAINT.ORDER.SET.CREATE.OK":
      return {
        ...state,
        response: action.payload.success ? "success" : "fail",
        reports: action.payload.reports,
      };

    case "CONSTRAINT.ORDER.SET.CREATE.ERROR":
      return { ...state, response: "communication-error" };

    case "CONSTRAINT.ORDER.SET.CREATE.CLOSE":
      return initialState;

    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default: {
      let sets = resourceSet(state.sets, action);
      if (sets.length === 1) {
        sets = [{ ...sets[0], ...onlyOneSettings }];
      }

      return { ...state, sets };
    }
  }
};
