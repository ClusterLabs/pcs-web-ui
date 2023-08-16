import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../interception";

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
