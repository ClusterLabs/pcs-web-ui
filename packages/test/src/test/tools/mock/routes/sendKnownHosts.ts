import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

export const sendKnownHosts = (
  nodeName: string,
  response: RouteResponse = {text: "success"},
) => ({
  url: endpoints.sendKnownHosts.url,
  body: {"node_names[]": nodeName},
  ...response,
});
