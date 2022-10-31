import React from "react";

import {useTask as useTaskCommon} from "app/view/share";

export const useTask = () => {
  const task = useTaskCommon("importExistingCluster");
  const {state, dispatch, close} = task;

  const checkNode = () => {
    dispatch({
      type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH",
      payload: {
        nodeName: state.nodeName,
      },
    });
  };

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (state.nodeCheck === "not-started") {
        checkNode();
      }
    });
  };
  return {
    ...task,
    isNodeNameValid: state.nodeName.length > 0,
    isNodeCheckDoneValid: state.nodeCheck === "success",
    useNodeCheck,
    checkNode,

    updateNodeName: (nodeName: string) => {
      dispatch({
        type: "DASHBOARD.CLUSTER.IMPORT.UPDATE_NODE",
        payload: {nodeName},
      });
    },

    close: () => {
      dispatch({
        type: "DASHBOARD.CLUSTER.IMPORT.CLOSE",
      });
      close();
    },

    importCluster: () => {
      dispatch({
        type: "DASHBOARD.CLUSTER.IMPORT.RUN",
        payload: {nodeName: state.nodeName},
      });
    },
  };
};
