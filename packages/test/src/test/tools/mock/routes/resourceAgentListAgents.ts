import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

import type {RouteResponse} from "../mock";

export const resourceAgentListAgents = ({
  response,
}: {
  response?: RouteResponse;
} = {}) => ({
  url: endpoints.libClusterResourceAgentListAgents.url,
  payload: endpoints.libClusterResourceAgentListAgents.payload,
  ...(response ?? {
    json: responses.lib.success({
      data: responses.resourceAgentListWithoutDescribe.ok,
    }),
  }),
});
