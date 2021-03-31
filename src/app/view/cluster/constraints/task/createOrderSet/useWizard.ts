import { ActionPayload } from "app/store";
import { useClusterWizard } from "app/view/share";

export const useWizard = () => {
  const clusterWizard = useClusterWizard("taskConstraintOrderSetCreate");
  const { clusterName, dispatch } = clusterWizard;

  return {
    ...clusterWizard,

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),
  };
};
