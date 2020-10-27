import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { NODE_ADD } from "app/scenes/wizardKeys";
import { actions, selectors, useDispatch } from "app/store";
import { useClusterSelector, useWizardOpenClose } from "app/view";

type ActionUpdate = actions.NodeActions["NodeAddUpdate"];

export const useWizard = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardNodeAddState,
  );
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(NODE_ADD);
  const wizardContext = React.useContext(WizardContext);

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (wizardState.nodeCheck === "not-started") {
        dispatch({
          type: "NODE.ADD.CHECK_CAN_ADD",
          payload: {
            clusterUrlName,
            nodeName: wizardState.nodeName,
          },
        });
      }
    });
  };

  return {
    // don't spread wizardContext to avoid conflict if patternfly adds something
    wizard: wizardContext,
    wizardState,
    clusterUrlName,
    updateState: (state: ActionUpdate["payload"]["state"]) => {
      dispatch({
        type: "NODE.ADD.UPDATE",
        payload: {
          clusterUrlName,
          state,
        },
      });
    },
    nodeAdd: () =>
      dispatch({
        type: "NODE.ADD",
        payload: {
          clusterUrlName,
          nodeName: wizardState.nodeName,
        },
      }),
    close: () => {
      openClose.close();
    },
    dispatch,
    open: openClose.open,
    isOpened: openClose.isOpened,
    useNodeCheck,
  };
};
