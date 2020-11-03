import React from "react";

import { actions, selectors } from "app/store";
import { useClusterState, useClusterWizard } from "app/view";

type ActionUpdate = actions.NodeActions["NodeAddUpdate"];

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "node-add",
    selectors.getWizardNodeAddState,
  );
  const { clusterUrlName, state, dispatch } = clusterWizard;

  const { cluster } = useClusterState(clusterUrlName);

  const checkCanAddNode = () =>
    dispatch({
      type: "NODE.ADD.CHECK_CAN_ADD",
      payload: {
        clusterUrlName,
        nodeName: state.nodeName,
      },
    });

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (state.nodeCheck === "not-started") {
        checkCanAddNode();
      }
    });
  };

  const filledSbdDevices = state.sbdDevices.filter(a => a.length > 0);
  const filledNodeAddresses = Object.values(state.nodeAddresses).filter(
    a => a.length > 0,
  );

  return {
    ...clusterWizard,

    filledSbdDevices,

    filledNodeAddresses,

    isNameValid: state.nodeName.length > 0,

    isNodeCheckDoneValid: state.nodeCheck === "success",

    isSbdEnabled: cluster.sbdDetection !== null && cluster.sbdDetection.enabled,

    // actions
    updateState: (state: ActionUpdate["payload"]["state"]) =>
      dispatch({
        type: "NODE.ADD.UPDATE",
        payload: {
          clusterUrlName,
          state,
        },
      }),

    checkAuth: () =>
      dispatch({
        type: "NODE.ADD.CHECK_AUTH",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
        },
      }),

    nodeAdd: () =>
      dispatch({
        type: "NODE.ADD",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
          sbdWatchdog: state.sbdWatchdog,
          sbdDevices: filledSbdDevices,
          sbdNoWatchdogValidation: state.sbdNoWatchdogValidation,
          nodeAddresses: filledNodeAddresses,
        },
      }),

    nodeAuth: (password: string, address: string, port: string) =>
      dispatch({
        type: "NODE.ADD.AUTHENTICATE",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
          password,
          address,
          port,
        },
      }),

    nodeStart: () =>
      dispatch({
        type: "NODE.START",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
        },
      }),

    checkCanAddNode,

    useNodeCheck,
  };
};
