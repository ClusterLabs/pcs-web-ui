import * as t from "io-ts";

import { endpoint } from "app/backend/endpoints/endpoint";

import { shape as libShape } from "../shape";

const optionalString = t.union([t.string, t.null]);
const agentActions = t.array(
  t.intersection([
    t.type({ name: t.string }),
    t.partial({
      interval: optionalString,
      timeout: optionalString,
      role: optionalString,
      start_delay: optionalString,
      depth: optionalString,
      automatic: optionalString,
      on_target: optionalString,
      OCF_CHECK_LEVEL: optionalString,
    }),
  ]),
);
export const pcmkAgent = t.intersection([
  t.type({
    name: t.string,
    shortdesc: t.string,
    longdesc: t.string,
    parameters: t.array(
      t.intersection([
        t.type({
          name: t.string,
          type: t.string,
          shortdesc: t.string,
          longdesc: t.string,
          default: t.union([t.null, t.string, t.number]),
          required: t.boolean,
          advanced: t.boolean,
          deprecated: t.boolean,
          deprecated_by: t.array(t.string),
          obsoletes: optionalString,
          pcs_deprecated_warning: optionalString,
        }),
        t.partial({
          unique: t.boolean,
        }),
      ]),
    ),
  }),
  t.partial({
    actions: agentActions,
    default_actions: agentActions,
  }),
]);

type AgentType = "resource" | "fence";

export const pcmkAgentDescribeAgent = (type: AgentType) =>
  endpoint({
    url: ({ clusterName }: { clusterName: string }) =>
      `/managec/${clusterName}/api/v1/${
        type === "resource"
          ? "resource-agent-describe-agent"
          : "stonith-agent-describe-agent"
      }`,
    method: "post",
    params: undefined,
    payload: (agentName: string): { agent_name: string } => ({
      agent_name: agentName,
    }),
    shape: libShape(pcmkAgent),
  });

const agentListPayload: { describe?: boolean; search?: string } = {
  describe: false,
};
export const pcmkAgentListAgents = (type: AgentType) =>
  endpoint({
    url: ({ clusterName }: { clusterName: string }) =>
      `/managec/${clusterName}/api/v1/${
        type === "resource"
          ? "resource-agent-list-agents"
          : "stonith-agent-list-agents"
      }`,

    method: "post",
    params: undefined,
    payload: agentListPayload,
    shape: libShape(t.array(pcmkAgent)),
  });
