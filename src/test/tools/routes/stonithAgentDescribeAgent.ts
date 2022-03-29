import * as t from "io-ts";

import { endpoints } from "app/backend/endpoints";

import * as responses from "dev/responses";

const { url, payload, shape } = endpoints.libClusterStonithAgentDescribeAgent;

export const stonithAgentDescribeAgent = ({
  clusterName,
  agentName,
  agentData,
}: {
  clusterName: string;
  agentName: string;
  agentData: Extract<t.TypeOf<typeof shape>, { status: "success" }>["data"];
}) => ({
  url: url({ clusterName }),
  payload: payload(agentName),
  json: responses.lib.success({ data: agentData }),
});
