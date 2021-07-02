import React from "react";

import { ActionPayload } from "app/store";
import { TaskReport, useDashboardTask } from "app/view/share";

const onlyFilledNodes = (nodeNameList: string[]) =>
  nodeNameList.filter(nodeName => nodeName.length > 0);

export const useTask = () => {
  const task = useDashboardTask("clusterSetup");
  const { dispatch, state } = task;
  const checkCanAddClusterOrNodes = () =>
    dispatch({
      type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD",
      payload: {
        clusterName: state.clusterName,
        targetNode: "",
        nodeNameList: state.nodeNameList,
      },
    });

  const useClusterAndNodesCheck = () => {
    React.useEffect(() => {
      if (state.clusterAndNodesCheck === "not-started") {
        checkCanAddClusterOrNodes();
      }
    });
  };

  return {
    ...task,

    isClusterNameValid: state.clusterName.length > 0,

    areNodeNamesValid: onlyFilledNodes(state.nodeNameList).length > 0,

    isClusterNameAndNodeCheckDoneValid:
      state.clusterAndNodesCheck === "success",

    useClusterAndNodesCheck,

    updateClusterName: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME",
        payload,
      }),

    updateNode: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_NODES"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES",
        payload,
      }),

    updateState: (payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE"]) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE",
        payload,
      }),

    allReports: (
      state.canAddClusterOrNodesMessages.map(message => ({
        level: "ERROR" as Extract<TaskReport, { level: unknown }>["level"],
        message,
      })) as TaskReport[]
    ).concat(state.libCall.reports),

    // actions
    close: () => {
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.CLOSE",
      });
      task.close();
    },

    checkCanAddClusterOrNodes,

    checkAuth: () => {
      const nodeNameList = onlyFilledNodes(state.nodeNameList);
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH",
        payload: { nodeNameList, targetNode: nodeNameList[0] },
      });
    },

    sendKnownHosts: () => {
      const nodeNameList = onlyFilledNodes(state.nodeNameList);
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS",
        payload: { nodeNameList, targetNode: nodeNameList[0] },
      });
    },

    setupCluster: ({ force }: { force?: boolean } = { force: false }) => {
      const nodeNameList = onlyFilledNodes(state.nodeNameList);
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.CALL",
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: state.clusterName,
            nodes: nodeNameList.map(nodeName => ({ name: nodeName })),
            ...(force ? { force_flags: ["FORCE"] } : {}),
          },
        },
      });
    },
  };
};
