import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const setResourceUtilization = ({
  clusterName,
  resourceId,
  name,
  value,
  response,
}: {
  clusterName: string;
  resourceId: string;
  name: string;
  value: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.setResourceUtilization.url({clusterName}),
  body: paramsToBody(
    endpoints.setResourceUtilization.params({resourceId, name, value}),
  ),
  ...(response ?? {text: ""}),
});
