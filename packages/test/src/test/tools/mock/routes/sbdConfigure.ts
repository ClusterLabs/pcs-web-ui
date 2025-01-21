import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type SbdEnablePayload = LibClusterCommandPayload["sbd-enable-sbd"];

export const sbdConfigure = ({
  clusterName,
  sbd_options,
  watchdog_dict,
  response,
}: {
  clusterName: string;
  sbd_options: SbdEnablePayload["sbd_options"];
  watchdog_dict: SbdEnablePayload["watchdog_dict"];
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "sbd-enable-sbd",
    payload: {
      default_watchdog: null,
      ignore_offline_nodes: false,
      sbd_options,
      watchdog_dict,
    },
    response: response ?? {
      json: {
        status: "success",
        status_msg: null,
        report_list: [],
        data: null,
      },
    },
  });
