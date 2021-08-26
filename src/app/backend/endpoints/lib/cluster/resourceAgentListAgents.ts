import * as t from "io-ts";

import { endpoint } from "app/backend/endpoints/endpoint";

import { shape as libShape } from "../shape";

import { resourceAgent } from "./shape/resourceAgent";

const payload: { describe?: boolean; search?: string } = {
  describe: false,
};

export const resourceAgentListAgents = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/api/v1/resource-agent-list-agents`,
  method: "post",
  params: undefined,
  payload,
  shape: libShape(t.array(resourceAgent)),
});
