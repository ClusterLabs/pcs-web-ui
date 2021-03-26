import React from "react";

import { types } from "app/store";
import {
  AttributeList,
  AttributeName,
  AttributeValue,
} from "app/view/share/attributes";
import { AttributeHelpPopover } from "app/view/share";

import { AgentParameter } from "../types";

export const PcmkAgentAttrsList = ({
  agentAttributes,
  resourceAgentParameters,
}: {
  agentAttributes: Record<string, types.cluster.AgentAttribute>;
  resourceAgentParameters: AgentParameter[];
}) => {
  return (
    <AttributeList attributes={resourceAgentParameters}>
      {parameter => (
        <React.Fragment key={parameter.name}>
          <AttributeName name={parameter.name}>
            <AttributeHelpPopover
              header={parameter.shortdesc}
              body={parameter.longdesc}
              defaultValue={parameter.default}
            />
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
