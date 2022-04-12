import { RouteResponse } from "test/tools/interception";

import { libCluster } from "./libCluster";

export const sbdConfigure = (
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
    name: "sbd-enable-sbd",
    payload: {
      default_watchdog: null,
      ignore_offline_nodes: false,
      sbd_options: {
        SBD_DELAY_START: "no",
        SBD_STARTMODE: "always",
        SBD_TIMEOUT_ACTION: "flush,reboot",
        SBD_WATCHDOG_TIMEOUT: "5",
      },
      watchdog_dict: {
        "node-1": "/dev/watchdog-test",
      },
    },
    response,
  });
