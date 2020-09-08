import React from "react";
import { ExpandableSection, Text } from "@patternfly/react-core";

import { types } from "app/store";

export const PcmkAgentDescription = ({
  agent,
}: {
  agent: types.pcmkAgents.Agent;
}) => {
  const lastIndex = agent.name.lastIndexOf(":");

  return (
    <div className="pf-c-content">
      <dl>
        <dt>Type</dt>
        <dd>
          <strong>{agent.name.substring(lastIndex + 1)}</strong>
          {` (${agent.name.substring(0, lastIndex)})`}
        </dd>
        <dt>Description</dt>
        <dd>
          {agent.shortdesc}
          <ExpandableSection toggleText="Full description">
            {agent.longdesc.split("\n\n").map((line, i) => (
              /* eslint-disable react/no-array-index-key */
              <Text component="p" key={i}>
                {line}
              </Text>
            ))}
          </ExpandableSection>
        </dd>
      </dl>
    </div>
  );
};
