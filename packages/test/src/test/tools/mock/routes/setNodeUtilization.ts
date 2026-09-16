import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const setNodeUtilization = ({
  nodeName,
  name,
  value,
  response,
}: {
  nodeName: string;
  name: string;
  value: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.setNodeUtilization.url,
  body: paramsToBody(
    endpoints.setNodeUtilization.params({nodeName, name, value}),
  ),
  ...(response ?? {text: ""}),
});
