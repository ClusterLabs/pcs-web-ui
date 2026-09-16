import {endpoint} from "./endpoint";

export const destroyCluster = endpoint({
  url: "/managec/cluster_destroy",
  method: "post",
  params: undefined,
  validate: undefined,
  shape: undefined,
  payload: undefined,
});
