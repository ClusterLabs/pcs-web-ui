import React from "react";

import { Primitive } from "app/view/cluster/types";
import {
  AttributeHelpPopover,
  AttributeList,
  AttributeName,
  AttributeValue,
} from "app/view/share/attributes";

import { AgentParameter } from "../types";

export const PcmkAgentAttrsList = ({
  agentAttributes,
  resourceAgentParameters,
}: {
  agentAttributes: Primitive["instanceAttributes"];
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
