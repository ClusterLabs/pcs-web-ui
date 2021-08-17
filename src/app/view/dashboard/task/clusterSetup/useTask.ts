import React from "react";

import { ActionPayload } from "app/store";
import { TaskReport, useDashboardTask } from "app/view/share";

type SetupData = ActionPayload["DASHBOARD.CLUSTER.SETUP.CALL"]["setupData"];

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

    updateLinkKnet: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_LINK_KNET"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_LINK_KNET",
        payload,
      }),

    setLinksKnet: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.SET_LINKS_KNET"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.SET_LINKS_KNET",
        payload,
      }),

    updateQuorumOptions: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS",
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
      const quorumOptions: SetupData["quorum_options"] = {
        ...(state.quorumOptions.autoTieBreaker !== "default"
          ? {
              auto_tie_breaker:
                state.quorumOptions.autoTieBreaker === "on" ? "1" : "0",
            }
          : {}),
        ...(state.quorumOptions.lastManStanding !== "default"
          ? {
              last_man_standing:
                state.quorumOptions.lastManStanding === "on" ? "1" : "0",
            }
          : {}),
        ...(state.quorumOptions.lastManStandingWindow !== ""
          ? {
              last_man_standing_window:
                state.quorumOptions.lastManStandingWindow,
            }
          : {}),
        ...(state.quorumOptions.waitForAll !== "default"
          ? {
              wait_for_all: state.quorumOptions.waitForAll === "on" ? "1" : "0",
            }
          : {}),
      };

      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.CALL",
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: state.clusterName,
            // The backend defaults addresses. But it only does so when there
            // is no key "addrs" for a node.  There can be following (valid)
            // scenarios:
            // 1 User sets no links. We omit key "addrs" for every node. The
            //   backend defaults addresses.
            // 2 User sets 1 link and keeps all addresses fields empty. We omit
            //   key "addrs" for every node. The backend defaults addresses.
            // 3 User sets 1 link and keeps some addresses fields empty. We
            //   omit key "addrs" for respective nodes. The backend defaults
            //   addresses for the nodes with no address set by the user.
            // 4 User sets more links. We omit key "addrs" when no addresses
            //   for a node are filled. The backend defaults addresses for the
            //   nodes with no addresses set by the user.
            // Because we need to support all the scenarios and the backend
            // defaults addresses only when key "addrs" is not specified we
            // cannot simply send empty addresses or empty address list (i.e.
            // key "addrs").
            nodes: nodeNameList.map((n) => {
              const addrs = state.linkList.reduce<string[]>(
                (addrList, link) => [
                  ...addrList,
                  ...(n in link.addresses && link.addresses[n].length > 0
                    ? [link.addresses[n]]
                    : []),
                ],
                [],
              );
              return {
                name: n,
                ...(addrs.length > 0 ? { addrs } : {}),
              };
            }),
            ...(force ? { force_flags: ["FORCE"] } : {}),
            transport_type: state.transportType,
            link_list: state.linkList.map(l => ({
              linknumber: l.linknumber,
              link_priority: l.link_priority,
              mcastport: l.mcastport,
              ping_interval: l.ping_interval,
              ping_precision: l.ping_precision,
              ping_timeout: l.ping_timeout,
              pong_count: l.pong_count,
              transport: l.transport,
            })), // TODO
            ...(Object.keys(quorumOptions).length > 0
              ? { quorum_options: quorumOptions }
              : {}),
          },
        },
      });
    },
  };
};
