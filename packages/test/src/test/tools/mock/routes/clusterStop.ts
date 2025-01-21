import {endpoints} from "app/backend/endpoints";

import type {RequestData, RouteResponse} from "../mock";

export const clusterStop = ({
  clusterName,
  nodeName,
  response,
}: {
  clusterName: string;
  nodeName?: string;
  response?: RouteResponse;
}) => {
  const body: RequestData["body"] = nodeName ? {name: nodeName} : {all: "1"};
  return {
    url: endpoints.clusterStop.url({clusterName}),
    body,
    ...(response ?? {text: ""}),
  };
};
