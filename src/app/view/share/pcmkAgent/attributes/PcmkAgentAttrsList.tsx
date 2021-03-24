import React from "react";

import { types } from "app/store";
import {
  AttributeList,
  AttributeName,
  AttributeValue,
} from "app/view/share/attributes";

import { PcmkAgentAttrsHelpPopover } from "./PcmkAgentAttrsHelpPopover";

export const PcmkAgentAttrsList = ({
  agentAttributes,
  resourceAgentParameters,
}: {
  agentAttributes: Record<string, types.cluster.AgentAttribute>;
  resourceAgentParameters: types.pcmkAgents.AgentParameter[];
}) => {
  return (
    <AttributeList attributes={resourceAgentParameters}>
      {parameter => (
        <React.Fragment key={parameter.name}>
          <AttributeName name={parameter.name}>
            <PcmkAgentAttrsHelpPopover resourceAgentParam={parameter} />
          </AttributeName>
          <AttributeValue
            value={agentAttributes[parameter.name]?.value}
            defaultValue={parameter.default}
          />
        </React.Fragment>
      )}
    </AttributeList>
  );
};
