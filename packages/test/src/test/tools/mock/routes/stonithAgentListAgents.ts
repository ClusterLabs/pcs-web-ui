import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

import type {RouteResponse} from "../mock";

export const stonithAgentListAgents = ({
  response,
}: {
  response?: RouteResponse;
} = {}) => ({
  url: endpoints.libClusterStonithAgentListAgents.url,
  payload: endpoints.libClusterResourceAgentListAgents.payload,
  ...(response ?? {
    json: responses.lib.success({
      data: responses.stonithAgentListWithoutDescribe.ok,
    }),
  }),
});
