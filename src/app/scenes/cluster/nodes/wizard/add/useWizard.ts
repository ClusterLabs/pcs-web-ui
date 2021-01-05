import React from "react";

import { ActionMap, selectors } from "app/store";
import { useClusterState, useClusterWizard } from "app/view";

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
      id: { cluster: clusterUrlName },
      payload: {
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
    close: () => {
      clusterWizard.close();
      dispatch({
        type: "NODE.ADD.CLOSE",
        id: { cluster: clusterUrlName },
      });
    },

    updateState: (payload: ActionMap["NODE.ADD.UPDATE"]["payload"]) =>
      dispatch({
        type: "NODE.ADD.UPDATE",
        id: { cluster: clusterUrlName },
        payload,
      }),

    updateNodeName: (nodeName: string) =>
      dispatch({
        type: "NODE.ADD.UPDATE_NODE_NAME",
        id: { cluster: clusterUrlName },
        payload: {
          nodeName,
        },
      }),

    checkAuth: () =>
      dispatch({
        type: "NODE.ADD.CHECK_AUTH",
        id: { cluster: clusterUrlName },
        payload: {
          nodeName: state.nodeName,
        },
      }),

    nodeAdd: () =>
      dispatch({
        type: "NODE.ADD",
        id: { cluster: clusterUrlName },
        payload: {
          nodeName: state.nodeName,
          sbdWatchdog: state.sbdWatchdog,
          sbdDevices: filledSbdDevices,
          sbdNoWatchdogValidation: state.sbdNoWatchdogValidation,
          nodeAddresses: filledNodeAddresses,
        },
      }),

    nodeStart: () =>
      dispatch({
        type: "NODE.START",
        id: { cluster: clusterUrlName },
        payload: { nodeName: state.nodeName },
      }),

    checkCanAddNode,

    useNodeCheck,
  };
};
