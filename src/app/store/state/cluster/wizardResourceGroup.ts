import { api } from "app/backend";
import { Reducer } from "app/store/redux";

export type WizardResourceGroup = {
  groupName: string;
  reports: api.types.lib.Report[];
  showValidationErrors: boolean;
};

const initialState: WizardResourceGroup = {
  groupName: "",
  reports: [],
  showValidationErrors: false,
};

const wizardResourceGroup: Reducer<WizardResourceGroup> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.GROUP.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload.state,
      };
    default:
      return state;
  }
};

export default wizardResourceGroup;
