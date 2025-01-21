import type {ActionPayload} from "app/store/actions";

import type {Cluster} from "../types";

type ApiNodeWithData = Exclude<
  ActionPayload["CLUSTER.STATUS.FETCH.OK"]["node_list"][number],
  {status: "unknown"}
>;
type Sbd = Exclude<
  Cluster["nodeList"][number],
  {status: "DATA_NOT_PROVIDED"}
>["sbd"];

export const apiToNodeSbd = (apiNode: ApiNodeWithData): Sbd => {
  const {sbd_config} = apiNode;

  if (sbd_config === null) {
    return undefined;
  }

  const configDevice = sbd_config.SBD_DEVICE ?? "";
  return {
    config: sbd_config,
    watchdog: sbd_config.SBD_WATCHDOG_DEV,
    devices: configDevice.length > 0 ? configDevice.split(";") : [],
  };
};
