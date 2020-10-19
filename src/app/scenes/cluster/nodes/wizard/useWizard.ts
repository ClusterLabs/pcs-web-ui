import { NODE_ADD } from "app/scenes/wizardKeys";
import { actions, selectors, useDispatch } from "app/store";
import { useClusterSelector, useWizardOpenClose } from "app/view";

export const useWizard = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardNodeAddState,
  );
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(NODE_ADD);
  type ActionUpdate = actions.NodeActions["NodeAddUpdate"];
  return {
    wizardState,
    updateState: (state: ActionUpdate["payload"]["state"]) => {
      dispatch({
        type: "NODE.ADD.UPDATE",
        payload: {
          clusterUrlName,
          state,
        },
      });
    },
    close: () => {
      openClose.close();
    },
    open: openClose.open,
    isOpened: openClose.isOpened,
  };
};
