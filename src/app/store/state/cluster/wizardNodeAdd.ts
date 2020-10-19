import { Reducer } from "app/store/redux";

export type WizardNodeAdd = {
  nodeName: string;
};

const initialState: WizardNodeAdd = {
  nodeName: "",
};

const wizardNodeAdd: Reducer<WizardNodeAdd> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.ADD.UPDATE": {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    default:
      return state;
  }
};

export default wizardNodeAdd;
