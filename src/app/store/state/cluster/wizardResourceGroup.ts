import { api } from "app/backend";
import { Reducer } from "app/store/redux";

export type WizardResourceGroup = {
  groupName: string;
  reports: api.types.lib.Report[];
};

const initialState: WizardResourceGroup = {
  groupName: "",
  reports: [],
};

const wizardResourceGroup: Reducer<WizardResourceGroup> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default wizardResourceGroup;
