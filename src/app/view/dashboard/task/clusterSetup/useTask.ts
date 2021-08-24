import React from "react";

import { ActionPayload } from "app/store";
import { TaskReport, useDashboardTask } from "app/view/share";

type SetupData = ActionPayload["DASHBOARD.CLUSTER.SETUP.CALL"]["setupData"];

const onlyFilledNodes = (nodeNameList: string[]) =>
  nodeNameList.filter(nodeName => nodeName.length > 0);

const transformOnOff = (value: unknown) => (value === "on" ? "1" : "0");

const prepareOptionalOptions = <KEY extends string>(
  rawOptions: Record<KEY, unknown>,
  {
    omitValues = {},
    transformValues = {},
  }: {
    omitValues?: Partial<Record<KEY, unknown>>;
    transformValues?: Partial<Record<KEY, (_rawValue: unknown) => unknown>>;
  },
) =>
  (Object.entries(rawOptions) as [KEY, unknown][]).reduce(
    (options, [key, value]) => {
      if (key in omitValues && value === omitValues[key]) {
        return options;
      }
      const transform = transformValues[key];
      return {
        ...options,
        [key]: transform !== undefined ? transform(value) : value,
      };
    },
    {},
  );

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

    updateTotemOptions: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_TOTEM_OPTIONS"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_TOTEM_OPTIONS",
        payload,
      }),

    updateTransportOptions: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_KNET_TRANSPORT_OPTIONS"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_KNET_TRANSPORT_OPTIONS",
        payload,
      }),

    updateCompressionOptions: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_KNET_COMPRESSION_OPTIONS"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_KNET_COMPRESSION_OPTIONS",
        payload,
      }),

    updateCryptoOptions: (
      payload: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_KNET_CRYPTO_OPTIONS"],
    ) =>
      dispatch({
        type: "DASHBOARD.CLUSTER.SETUP.UPDATE_KNET_CRYPTO_OPTIONS",
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
      const quorumOptions: SetupData["quorum_options"] = prepareOptionalOptions(
        state.quorumOptions,
        {
          omitValues: {
            auto_tie_breaker: "default",
            last_man_standing: "default",
            last_man_standing_window: "",
            wait_for_all: "default",
          },
          transformValues: {
            auto_tie_breaker: transformOnOff,
            last_man_standing: transformOnOff,
            wait_for_all: transformOnOff,
          },
        },
      );
      const totemOptions: SetupData["totem_options"] = prepareOptionalOptions(
        state.totemOptions,
        {
          omitValues: {
            block_unlisted_ips: "default",
            consensus: "",
            downcheck: "",
            fail_recv_const: "",
            heartbeat_failures_allowed: "",
            hold: "",
            join: "",
            max_messages: "",
            max_network_delay: "",
            merge: "",
            miss_count_const: "",
            send_join: "",
            seqno_unchanged_const: "",
            token: "",
            token_coefficient: "",
            token_retransmit: "",
            token_retransmits_before_loss_const: "",
            window_size: "",
          },
        },
      );

      const transportOptions: SetupData["transport_options"] =
        prepareOptionalOptions(state.transportOptions, {
          omitValues: {
            link_mode: "default",
            ip_version: "default",
            knet_pmtud_interval: "",
          },
        });

      const compressionOptions: SetupData["compression_options"] =
        prepareOptionalOptions(state.compressionOptions, {
          omitValues: {
            level: "",
            model: "",
            threshold: "",
          },
        });

      const cryptoOptions: SetupData["crypto_options"] = prepareOptionalOptions(
        state.cryptoOptions,
        {
          omitValues: {
            hash: "default",
            model: "default",
            cipher: "default",
          },
        },
      );

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
            })), // TODO vynechat optional
            ...(Object.keys(quorumOptions).length > 0
              ? { quorum_options: quorumOptions }
              : {}),
            ...(Object.keys(totemOptions).length > 0
              ? { totem_options: totemOptions }
              : {}),
            ...(Object.keys(transportOptions).length > 0
              ? { transport_options: transportOptions }
              : {}),
            ...(Object.keys(compressionOptions).length > 0
              ? { compression_options: compressionOptions }
              : {}),
            ...(Object.keys(cryptoOptions).length > 0
              ? { crypto_options: cryptoOptions }
              : {}),
          },
        },
      });
    },
  };
};
