import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

export const existingCluster = ({
  nodeName,
  response,
}: {
  nodeName: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.existingCluster.url,
  body: {"node-name": nodeName},
  ...(response ?? {text: ""}),
});
