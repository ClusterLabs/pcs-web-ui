import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

export const sendKnownHosts = (
  clusterName: string,
  nodeName: string,
  response: RouteResponse = {text: "success"},
) => ({
  url: endpoints.sendKnownHosts.url({clusterName}),
  body: {"node_names[]": nodeName},
  ...response,
});
