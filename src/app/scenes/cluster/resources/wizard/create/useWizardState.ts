import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view";

export const useWizardState = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const dispatch = useDispatch();

  return {
    wizardState,
    clusterUrlName,
    dispatch,
  };
};
