import React from "react";

import { types } from "app/store";

import { PcmkAgentAttrsListItem } from "./PcmkAgentAttrsListItem";

export const PcmkAgentAttrsList = ({
  agentAttributes,
  resourceAgentParameters,
}: {
  agentAttributes: Record<string, types.cluster.AgentAttribute>;
  resourceAgentParameters: types.pcmkAgents.AgentParameter[];
}) => {
  return (
    <div className="pf-c-content">
      <dl>
        {resourceAgentParameters.map(parameter => (
          <PcmkAgentAttrsListItem
            key={parameter.name}
            agentAttributes={agentAttributes}
            resourceAgentParam={parameter}
          />
        ))}
      </dl>
    </div>
  );
};
