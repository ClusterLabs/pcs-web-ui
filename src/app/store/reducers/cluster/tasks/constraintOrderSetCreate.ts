import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

type Action = Exclude<
  ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET"]["set"]["action"],
  undefined
>;
type Kind = Exclude<
  ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE"]["kind"],
  undefined
>;

const initialSet: {
  resources: string[];
  action: Action;
  sequential: boolean;
  requireAll: boolean;
} = {
  resources: [],
  action: "start",
  sequential: true,
  requireAll: true,
};

const initialState: {
  id: string;
  kind: Kind;
  symmetrical: boolean;
  sets: typeof initialSet[];
  reports: LibReport[];
} = {
  id: "",
  kind: "Mandatory",
  symmetrical: true,
  sets: [initialSet],
  reports: [],
};

const setForOnlyOne = (set: typeof initialSet) => {
  // disabled sequential does not make sense for only one set
  // disabled requiereAll does not make sense if sequential is enabled
  set.sequential = true;
  set.requireAll = true;
};

export const constraintOrderSetCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET":
      return {
        ...state,
        sets: [...state.sets, initialSet],
      };

    case "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET": {
      const sets = state.sets.filter((_set, i) => i !== action.payload.index);
      if (sets.length === 1) {
        setForOnlyOne(sets[0]);
      }
      return { ...state, sets };
    }

    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET": {
      const { index, set: setUpdate } = action.payload;

      const set = { ...state.sets[index], ...setUpdate };
      if (state.sets.length === 1) {
        setForOnlyOne(set);
      } else if (set.sequential) {
        // disabled requiereAll does not make sense if sequential is enabled
        set.requireAll = true;
      }

      return {
        ...state,
        sets: state.sets.map((s, i) => (i !== index ? s : set)),
      };
    }
    default:
      return state;
  }
};
