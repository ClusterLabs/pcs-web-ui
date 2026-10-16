import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const clusterNodeAdd = (
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
    name: "cluster-add-nodes",
    payload: {
      nodes: [{name: nodeName}],
      no_watchdog_validation: false,
      force_flags: [],
    },
    response,
  });
