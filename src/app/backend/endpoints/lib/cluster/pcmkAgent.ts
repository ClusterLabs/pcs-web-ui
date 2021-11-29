import * as t from "io-ts";

import { endpoint } from "app/backend/endpoints/endpoint";

import { shape as libShape } from "../shape";

const optionalString = t.union([t.string, t.null]);
const optionalStringOrBool = t.union([t.string, t.boolean, t.null]);
const optionalStringOrNumber = t.union([t.string, t.number, t.null]);
const agentActions = t.array(
  t.intersection([
    t.type({ name: t.string }),
    t.partial({
      //interval is always turned to string if it is for default_actions
      //but keep it here optional for simplicity
      interval: optionalString,
      timeout: optionalString,
      role: optionalString,
      //start_delay: optionalString, //currently transformed to start-delay
      "start-delay": optionalString,
      //depth: optionalString, //currently transformed to OCF_CHECK_LEVEL
      automatic: optionalStringOrBool, //new ocf has always bool
      on_target: optionalStringOrBool, //new ocf has always bool
      OCF_CHECK_LEVEL: optionalString,
    }),
  ]),
);
export const pcmkAgent = t.intersection([
  t.type({
    name: t.string,
    shortdesc: optionalString,
    longdesc: optionalString,
    parameters: t.array(
      t.intersection([
        t.type({
          name: t.string,
          type: t.string,
          shortdesc: optionalString,
          longdesc: optionalString,
          default: optionalStringOrNumber,
          required: t.boolean,
          advanced: t.boolean,
          deprecated: t.boolean,
          deprecated_by: t.array(t.string),
        }),
        t.partial({
          unique: t.boolean,
          enum_values: t.union([t.array(t.string), t.null]),
          deprecated_desc: optionalString, //new ocf
          unique_group: optionalString, //new ocf
          obsoletes: optionalString, //old ocf
          pcs_deprecated_warning: optionalString, //old ocf
          reloadable: t.boolean, //new ocf
        }),
      ]),
    ),
  }),
  t.partial({
    standard: t.string, //new ocf
    provider: optionalString, //new ocf
    type: t.string, //new ocf
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
    validate: undefined,
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
    validate: undefined,
    payload: agentListPayload,
    shape: libShape(t.array(pcmkAgent)),
  });
