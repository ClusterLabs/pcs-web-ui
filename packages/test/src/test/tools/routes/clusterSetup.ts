import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

import {RouteResponse} from "test/tools/interception";

import {paramsToBody} from "./tools";

export const clusterSetup = (props: {
  payload: Parameters<typeof endpoints.clusterSetup.params>[0];
  response?: RouteResponse;
}) => {
  const response: RouteResponse = props?.response ?? {
    json: responses.lib.success(),
  };
  return {
    url: endpoints.clusterSetup.url,
    body: paramsToBody(endpoints.clusterSetup.params(props.payload)),
    ...response,
  };
};
