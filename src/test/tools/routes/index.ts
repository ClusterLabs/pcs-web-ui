import { LibClusterCommands, endpoints } from "app/backend/endpoints";
import { Permission } from "app/view/cluster/permissions/types";

import * as responses from "dev/responses";
import * as types from "dev/types";

import { Shapes, payload, url } from "test/tools";
import { RequestData, RouteResponse } from "test/tools/interception";

export * from "./existingCluster";

// list-values-in-query:
// * when "node_names[]=node1" appears in the query then it is recognized as
//   {"node_names[]": "node1"} - i.e. value is string not array
//
// * but when "node_names[]=node1&node_names[]=node2" appears in the query then
//   it is recognized as
//  {"node_names[]": ["node1", "node2"]} - i.e. value is array unlike prev case
//
//
const sanitizeValue = <KEY extends string>(
  body: Record<KEY, string | string[]>,
  key: KEY,
  value: string,
) => {
  if (!key.endsWith("[]") || key in body === false) {
    return value;
  }
  if (Array.isArray(body[key])) {
    return [...body[key], value];
  }
  return [body[key], value];
};

const paramsToBody = (params: [string, string][]) =>
  params.reduce(
    (body, [key, value]) => ({
      ...body,
      [key]: sanitizeValue(body, key, value),
    }),
    {},
  );

export const can_add_cluster_or_nodes = ({
  nodeNameList,
  clusterName,
  response,
}: {
  nodeNameList?: string[];
  clusterName?: string;
  response?: RouteResponse;
}) => {
  const query: RequestData["query"] = {};
  if (nodeNameList !== undefined && nodeNameList.length > 0) {
    // see list-values-in-query above
    query["node_names[]"] =
      nodeNameList.length === 1 ? nodeNameList[0] : nodeNameList;
  }
  if (clusterName !== undefined) {
    query["cluster"] = clusterName;
  }
  return {
    url: url.canAddClusterOrNodes,
    query,
    ...(response ?? { text: "" }),
  };
};

export const check_auth_against_nodes = ({
  nodeNameList,
  response,
}: {
  nodeNameList: string[];
  response?: RouteResponse;
}) => {
  const query: RequestData["query"] = {};
  if (nodeNameList !== undefined && nodeNameList.length > 0) {
    // see list-values-in-query above
    query["node_list[]"] =
      nodeNameList.length === 1 ? nodeNameList[0] : nodeNameList;
  }
  return {
    url: url.checkAuthAgainstNodes,
    query,
    ...(response ?? {
      json: nodeNameList.reduce(
        (nodeResults, nodeName) => ({
          ...nodeResults,
          [nodeName]: "Online",
        }),
        {},
      ),
    }),
  };
};

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

export const sendKnownHostsToNode = ({
  nodeNameList,
  targetNode,
  response,
}: {
  nodeNameList: string[];
  targetNode: string;
  response?: RouteResponse;
}) => {
  return {
    url: url.sendKnownHostsToNode,
    body: { "node_names[]": nodeNameList, target_node: targetNode },
    ...(response ?? { text: "success" }),
  };
};

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

export const updateFenceDevice = ({
  clusterName,
  fenceDeviceId,
  attributes,
  response,
}: {
  clusterName: string;
  fenceDeviceId: string;
  attributes: Record<string, string>;
  response?: RouteResponse;
}) => ({
  url: url.updateFenceDevice({ clusterName }),
  body: paramsToBody(
    endpoints.updateFenceDevice.params({
      resourceId: fenceDeviceId,
      attributes,
    }),
  ),
  ...(response ?? { text: JSON.stringify({}) }),
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

export const clusterSetup = (props: {
  payload: Parameters<typeof endpoints.clusterSetup.params>[0];
  response?: RouteResponse;
}) => {
  const response: RouteResponse = props?.response ?? {
    json: responses.lib.success(),
  };
  return {
    url: url.clusterSetup,
    body: paramsToBody(endpoints.clusterSetup.params(props.payload)),
    ...response,
  };
};

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
  body: { all: "1" },
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

export const getPermissions = ({
  clusterName,
  permissions,
}: {
  clusterName: string;
  permissions?: ReturnType<typeof responses.permissions>;
}) => ({
  url: url.getPermissions({ clusterName }),
  json: permissions || responses.permissions(),
});

export const permissionsSave = ({
  clusterName,
  permissionList,
  response,
}: {
  clusterName: string;
  permissionList: Permission[];
  response?: RouteResponse;
}) => ({
  url: url.permissionsSave({ clusterName }),
  body: paramsToBody(
    endpoints.permissionsSave.params({ clusterName, permissionList }),
  ),
  ...(response ?? { text: "Permissions saved" }),
});

export const importedClusterList = (
  props:
    | { clusterStatusList?: types.Cluster[] }
    | { clusterNameList?: string[] }
    | { response: RouteResponse } = {},
) => {
  let response;
  if ("response" in props) {
    response = props.response;
  } else if (
    "clusterNameList" in props
    && props.clusterNameList !== undefined
  ) {
    response = {
      json: responses.importedClusterList.withClusters(props.clusterNameList),
    };
  } else if (
    "clusterStatusList" in props
    && props.clusterStatusList !== undefined
  ) {
    response = {
      json: responses.importedClusterList.withClusters(
        props.clusterStatusList.map(
          clusterStatus => clusterStatus.cluster_name,
        ),
      ),
    };
  } else {
    response = {
      json: responses.importedClusterList.withClusters([]),
    };
  }

  return {
    url: url.importedClusterList,
    ...response,
  };
};

export const clusterStatus = ({
  clusterStatus,
}: {
  clusterStatus: types.Cluster;
}) => ({
  url: url.clusterStatus({ clusterName: clusterStatus.cluster_name }),
  json: clusterStatus,
});

export const rememberCluster = ({
  clusterName,
  nodeNameList,
  response,
}: {
  clusterName: string;
  nodeNameList: string[];
  response?: RouteResponse;
}) => ({
  url: url.rememberCluster,
  body: paramsToBody(
    endpoints.rememberCluster.params({ clusterName, nodeNameList }),
  ),
  ...(response ?? { text: "" }),
});
