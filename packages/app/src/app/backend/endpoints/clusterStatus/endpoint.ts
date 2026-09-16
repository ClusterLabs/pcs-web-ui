import {endpoint} from "../endpoint";

import {ApiClusterStatus as shape} from "./shape/cluster";

export const clusterStatus = endpoint({
  url: "/managec/cluster_status",
  method: "get",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape,
});
