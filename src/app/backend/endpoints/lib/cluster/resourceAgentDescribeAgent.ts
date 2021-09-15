import { endpoint } from "app/backend/endpoints/endpoint";

import { shape as libShape } from "../shape";

import { resourceAgent } from "./shape/resourceAgent";

export const resourceAgentDescribeAgent = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/api/v1/resource-agent-describe-agent`,
  method: "post",
  params: undefined,
  payload: (agentName: string): { agent_name: string } => ({
    agent_name: agentName,
  }),
  shape: libShape(resourceAgent),
});
