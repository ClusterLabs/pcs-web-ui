import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const getAvailResourceAgents = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/get_avail_resource_agents`,
  method: "get",
  shape: t.record(
    t.string,
    t.type({
      full_name: t.string,
      class_provider: t.string,
      class: t.string,
      provider: t.union([t.string, t.null]),
      type: t.string,
    }),
  ),
});
