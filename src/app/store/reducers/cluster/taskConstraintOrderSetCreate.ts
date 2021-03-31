import { Reducer } from "../tools";

const initialState: {
  id: string;
  kind: "Optional" | "Mandatory" | "Serialize";
  symmetrical: boolean;
} = {
  id: "",
  kind: "Mandatory",
  symmetrical: true,
};
export const taskConstraintOrderSetCreate: Reducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.SET.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
