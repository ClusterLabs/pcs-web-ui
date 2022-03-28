import { RouteResponse } from "test/tools/interception";

import { libCluster } from "./libCluster";

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
