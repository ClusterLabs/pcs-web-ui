import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { LoadedPcmkAgent, PcmkAgentAttrsList } from "app/view/common";

import { PrimitiveAttrsForm } from "./PrimitiveAttrsForm";
import { PrimitiveAttrsToolbar } from "./PrimitiveAttrsToolbar";

export const PrimitiveAttrsView = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <LoadedPcmkAgent agentName={primitive.agentName}>
      {(agent: types.pcmkAgents.Agent) => {
        if (isEditing) {
          return (
            <StackItem>
              <PrimitiveAttrsForm
                primitive={primitive}
                resourceAgentParams={agent.parameters}
                close={() => setIsEditing(false)}
              />
            </StackItem>
          );
        }

        return (
          <>
            <StackItem>
              <PrimitiveAttrsToolbar edit={() => setIsEditing(true)} />
            </StackItem>
            <StackItem>
              <PcmkAgentAttrsList
                agentAttributes={primitive.instanceAttributes}
                resourceAgentParameters={agent.parameters}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedPcmkAgent>
  );
};
