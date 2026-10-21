import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const sbdDisable = (
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
    name: "sbd-disable-sbd",
    response,
    payload: {
      ignore_offline_nodes: false,
    },
  });
