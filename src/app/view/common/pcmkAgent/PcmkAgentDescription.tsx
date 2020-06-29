import React from "react";
import { Alert, Expandable, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/store";

export const PcmkAgentDescription = ({
  agent,
}: {
  agent: types.pcmkAgents.Agent;
}) => {
  return (
    <Alert isInline title={agent.name} variant="info">
      <TextContent>
        <div>{agent.shortdesc}</div>
        <Expandable toggleText="Full description">
          {agent.longdesc.split("\n\n").map((line, i) => (
            /* eslint-disable react/no-array-index-key */
            <Text component="p" key={i}>
              {line}
            </Text>
          ))}
        </Expandable>
      </TextContent>
    </Alert>
  );
};