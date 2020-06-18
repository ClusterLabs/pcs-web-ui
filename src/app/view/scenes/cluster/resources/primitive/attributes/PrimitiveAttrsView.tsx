import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { LoadedResourceAgent, PcmkAgentAttrsList } from "app/view/common";

import { PrimitiveAttrsForm } from "./PrimitiveAttrsForm";
import { PrimitiveAttrsToolbar } from "./PrimitiveAttrsToolbar";

export const PrimitiveAttrsView = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <LoadedResourceAgent agentName={primitive.agentName}>
      {(resourceAgent: types.pcmkAgents.ResourceAgent) => {
        if (isEditing) {
          return (
            <StackItem>
              <PrimitiveAttrsForm
                primitive={primitive}
                resourceAgentParams={resourceAgent.parameters}
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
                resourceAgentParameters={resourceAgent.parameters}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedResourceAgent>
  );
};
