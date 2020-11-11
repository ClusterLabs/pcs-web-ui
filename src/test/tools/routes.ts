import { RouteResponse } from "./interception";

export const can_add_cluster_or_nodes = (
  nodeName: string,
  response: RouteResponse = { text: "" },
) => ({
  url: "/manage/can-add-cluster-or-nodes",
  query: { "node_names[]": nodeName },
  ...response,
});

export const check_auth_against_nodes = (
  nodeName: string,
  response: RouteResponse | null = null,
) => ({
  url: "/manage/check_auth_against_nodes",
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
  url: "/manage/auth_gui_against_nodes",
  body: {
    data_json: JSON.stringify({ nodes }),
  },
  ...(response ?? {
    json: {
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
  url: `/managec/${clusterName}/send-known-hosts`,
  body: { "node_names[]": nodeName },
  ...response,
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
) => ({
  url: `/managec/${clusterName}/api/v1/cluster-add-nodes/v1`,
  payload: {
    nodes: [{ name: nodeName }],
    no_watchdog_validation: false,
  },
  ...response,
});
