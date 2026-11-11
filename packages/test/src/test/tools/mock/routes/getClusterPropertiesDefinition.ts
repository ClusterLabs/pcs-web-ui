import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

import type {RouteResponse} from "../mock";

export const getClusterPropertiesDefinition = ({
  response,
}: {
  response?: RouteResponse;
} = {}) => ({
  url: endpoints.getClusterPropertiesDefinition.url,
  ...(response ?? {json: responses.clusterProperties.ok}),
});
