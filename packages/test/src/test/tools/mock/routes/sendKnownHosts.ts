import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

export const sendKnownHosts = (
  _clusterName: string,
  nodeName: string,
  response: RouteResponse = {text: "success"},
) => ({
  url: endpoints.sendKnownHosts.url,
  body: {"node_names[]": nodeName},
  ...response,
});
