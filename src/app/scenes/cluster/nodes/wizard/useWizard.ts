import React from "react";

import { actions, selectors } from "app/store";
import { useClusterWizard } from "app/view";

type ActionUpdate = actions.NodeActions["NodeAddUpdate"];

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "node-add",
    selectors.getWizardNodeAddState,
  );
  const { clusterUrlName, state, dispatch } = clusterWizard;

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (state.nodeCheck === "not-started") {
        dispatch({
          type: "NODE.ADD.CHECK_CAN_ADD",
          payload: {
            clusterUrlName,
            nodeName: state.nodeName,
          },
        });
      }
    });
  };

  return {
    ...clusterWizard,

    // actions
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
          nodeName: state.nodeName,
        },
      }),

    useNodeCheck,
  };
};
