import type * as t from "io-ts";

import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

const {url, payload, shape} = endpoints.libClusterResourceAgentDescribeAgent;

export const resourceAgentDescribeAgent = ({
  agentName,
  agentData,
}: {
  clusterName: string;
  agentName: string;
  agentData: Extract<t.TypeOf<typeof shape>, {status: "success"}>["data"];
}) => ({
  url,
  payload: payload(agentName),
  json: responses.lib.success({data: agentData}),
});
