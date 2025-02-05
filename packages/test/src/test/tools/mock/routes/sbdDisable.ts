import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const sbdDisable = (
  clusterName: string,
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
    name: "sbd-disable-sbd",
    response,
    payload: {
      ignore_offline_nodes: false,
    },
  });
