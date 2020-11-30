import { selectors } from "app/store";
import { useClusterWizard } from "app/view";

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "resource-group",
    selectors.getWizardResourceGroupState,
  );

  return {
    ...clusterWizard,
  };
};
