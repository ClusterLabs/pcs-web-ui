import { ActionMap, selectors } from "app/store";
import { useClusterWizard } from "app/view";

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "resource-group",
    selectors.getWizardResourceGroupState,
  );

  const { clusterName, dispatch } = clusterWizard;

  return {
    ...clusterWizard,

    // actions
    updateState: (
      state: ActionMap["RESOURCE.GROUP.CREATE.UPDATE"]["payload"]["state"],
    ) =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE.UPDATE",
        payload: { clusterName, state },
      }),
  };
};
