import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const setNodeUtilization = ({
  clusterName,
  nodeName,
  name,
  value,
  response,
}: {
  clusterName: string;
  nodeName: string;
  name: string;
  value: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.setNodeUtilization.url({clusterName}),
  body: paramsToBody(
    endpoints.setNodeUtilization.params({nodeName, name, value}),
  ),
  ...(response ?? {text: ""}),
});
