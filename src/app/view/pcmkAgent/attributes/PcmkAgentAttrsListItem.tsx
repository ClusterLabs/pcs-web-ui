import React from "react";

import { types } from "app/store";

import { PcmkAgentAttrsHelpPopover } from "./PcmkAgentAttrsHelpPopover";

export const PcmkAgentAttrsListItem = ({
  resourceAgentParam,
  agentAttributes,
}: {
  resourceAgentParam: types.pcmkAgents.AgentParameter;
  agentAttributes: Record<string, types.cluster.AgentAttribute>;
}) => (
  <>
    <dt>
      {`${resourceAgentParam.name} `}
      <PcmkAgentAttrsHelpPopover resourceAgentParam={resourceAgentParam} />
    </dt>
    {resourceAgentParam.name in agentAttributes && (
      <dd>{agentAttributes[resourceAgentParam.name].value}</dd>
    )}
    {!(resourceAgentParam.name in agentAttributes)
      && resourceAgentParam.default && (
        <dd style={{ color: "var(--pf-global--Color--200)" }}>
          <div>{resourceAgentParam.default}</div>
          <div style={{ fontStyle: "italic" }}>Default value</div>
        </dd>
    )}
  </>
);
