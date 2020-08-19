import * as types from "app/store/types";
import { Selector } from "app/store/types";

export const getWizardResourceCreateState = (
  clusterUrlName: string,
): Selector<types.wizardResourceCreate.WizardResourceCreate> => state =>
  state.clusterStorage[clusterUrlName]?.wizardResourceCreate;
