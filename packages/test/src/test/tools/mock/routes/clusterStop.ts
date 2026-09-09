import {endpoints} from "app/backend/endpoints";

import type {RequestData, RouteResponse} from "../mock";

export const clusterStop = ({
  nodeName,
  response,
}: {
  nodeName?: string;
  response?: RouteResponse;
}) => {
  const body: RequestData["body"] = nodeName ? {name: nodeName} : {all: "1"};
  return {url: endpoints.clusterStop.url, body, ...(response ?? {text: ""})};
};
