import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const updateClusterSettings = ({
  clusterName,
  settingsMap,
  force,
  response,
}: {
  clusterName: string;
  settingsMap: Record<string, string>;
  force: boolean;
  response?: RouteResponse;
}) => {
  return {
    url: endpoints.updateClusterSettings.url({clusterName}),
    body: paramsToBody(
      endpoints.updateClusterSettings.params({settingsMap, force}),
    ),
    ...(response ?? {text: ""}),
  };
};
