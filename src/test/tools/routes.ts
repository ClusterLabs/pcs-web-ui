import { LibClusterCommands } from "app/backend/endpoints";

import * as responses from "dev/responses";

import { Shapes, payload, url } from "test/tools";

import { RouteResponse } from "./interception";

export const can_add_cluster_or_nodes = (
  nodeName: string,
  response: RouteResponse = { text: "" },
) => ({
  url: url.canAddClusterOrNodes,
  query: { "node_names[]": nodeName },
  ...response,
});

export const check_auth_against_nodes = (
  nodeName: string,
  response: RouteResponse | null = null,
) => ({
  url: url.checkAuthAgainstNodes,
  query: { "node_list[]": nodeName },
  ...(response ?? { json: { [nodeName]: "Online" } }),
});

export const auth_gui_against_nodes = (
  nodes: Record<
    string,
    { password: string; dest_list: { addr: string; port: string }[] }
  >,
  response: RouteResponse | null = null,
) => ({
  url: url.authGuiAgainstNodes,
  body: {
    data_json: JSON.stringify({ nodes }),
  },
  ...(response ?? {
    json: {
      plaintext_error: "",
      node_auth_error: Object.keys(nodes).reduce<Record<string, 0>>(
        (nodesResponse, nodeName) => ({
          ...nodesResponse,
          [nodeName]: 0,
        }),
        {},
      ),
    },
  }),
});

export const send_known_hosts = (
  clusterName: string,
  nodeName: string,
  response: RouteResponse = { text: "success" },
) => ({
  url: url.sendKnownHosts({ clusterName }),
  body: { "node_names[]": nodeName },
  ...response,
});

export const resourceAgentListAgents = (clusterName: string) => ({
  url: url.libClusterResourceAgentListAgents({ clusterName }),
  payload: payload.libClusterResourceAgentListAgents,
  json: responses.lib.success({
    data: responses.resourceAgentListWithoutDescribe.ok,
  }),
});

export const stonithAgentListAgents = ({
  clusterName,
}: {
  clusterName: string;
}) => ({
  url: url.libClusterStonithAgentListAgents({ clusterName }),
  payload: payload.libClusterResourceAgentListAgents,
  json: responses.lib.success({
    data: responses.stonithAgentListWithoutDescribe.ok,
  }),
});

export const resourceAgentDescribeAgent = ({
  clusterName,
  agentName,
  agentData,
}: {
  clusterName: string;
  agentName: string;
  agentData: Extract<
    Shapes["libClusterResourceAgentDescribeAgent"],
    { status: "success" }
  >["data"];
}) => ({
  url: url.libClusterResourceAgentDescribeAgent({ clusterName }),
  payload: payload.libClusterResourceAgentDescribeAgent(agentName),
  json: responses.lib.success({ data: agentData }),
});

export const stonithAgentDescribeAgent = ({
  clusterName,
  agentName,
  agentData,
}: {
  clusterName: string;
  agentName: string;
  agentData: Extract<
    Shapes["libClusterStonithAgentDescribeAgent"],
    { status: "success" }
  >["data"];
}) => ({
  url: url.libClusterStonithAgentDescribeAgent({ clusterName }),
  payload: payload.libClusterStonithAgentDescribeAgent(agentName),
  json: responses.lib.success({ data: agentData }),
});

export const libCluster = (
  props: LibClusterCommands[number] & {
    clusterName: string;
    response?: RouteResponse;
  },
) => {
  const { clusterName, payload, name: command } = props;
  const response: RouteResponse = props?.response ?? {
    json: responses.lib.success(),
  };
  return {
    url: url.libCluster({ clusterName, command }),
    payload,
    ...response,
  };
};

export const stonithCreate = ({
  clusterName,
  fenceDeviceName,
  agentName,
  instanceAttrs,
  disabled,
  response,
  force,
}: {
  clusterName: string;
  fenceDeviceName: string;
  agentName: string;
  instanceAttrs: Extract<
    LibClusterCommands[number],
    { name: "stonith-create" }
  >["payload"]["instance_attributes"];
  disabled?: boolean;
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
    clusterName,
    name: "stonith-create",
    payload: {
      stonith_id: fenceDeviceName,
      stonith_agent_name: agentName,
      operations: [],
      meta_attributes: {},
      instance_attributes: instanceAttrs,
      allow_absent_agent: force === undefined ? false : force,
      allow_invalid_operation: force === undefined ? false : force,
      allow_invalid_instance_attributes: force === undefined ? false : force,
      ensure_disabled: !!disabled,
    },
    response,
  });

export const clusterNodeAdd = (
  clusterName: string,
  nodeName: string,
  response: RouteResponse = {
    json: {
      status: "success",
      status_msg: null,
      report_list: [],
      data: null,
    },
  },
) =>
  libCluster({
    clusterName,
    name: "cluster-add-nodes",
    payload: {
      nodes: [{ name: nodeName }],
      no_watchdog_validation: false,
      force_flags: [],
    },
    response,
  });

export const removeCluster = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status?: number;
}) => ({
  url: url.removeCluster,
  body: { [`clusterid-${clusterName}`]: "true" },
  status: [status ?? 200, ""] as [number, string],
});

export const destroyCluster = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status?: number;
}) => ({
  url: url.destroyCluster({ clusterName: clusterName }),
  body: { "--all": "1" },
  status: [status ?? 200, ""] as [number, string],
});

export const getClusterPropertiesDefinition = ({
  clusterName,
}: {
  clusterName: string;
}) => ({
  url: url.getClusterPropertiesDefinition({ clusterName }),
  json: responses.clusterProperties.ok,
});
