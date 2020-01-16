import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import PrimitiveAttributesView from "./PrimitiveAttributesView";
import { PrimitiveAttributesEdit } from "./form";
import LoadedResourceAgent from "./LoadedResourceAgent";
import PrimitiveAttributesToolbar from "./PrimitiveAttributesToolbar";

const PrimitiveAttributes = ({ primitive }: {
  primitive: types.cluster.Primitive,
}) => {
  const [isEditing, setIsEditing] = React.useState(true);
  return (
    <LoadedResourceAgent agentName={primitive.agentName}>
      {(resourceAgent: types.resourceAgents.ResourceAgentMetadata) => {
        if (isEditing) {
          return (
            <StackItem>
              <PrimitiveAttributesEdit
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
              <PrimitiveAttributesToolbar edit={() => setIsEditing(true)} />
            </StackItem>
            <StackItem>
              <PrimitiveAttributesView
                primitive={primitive}
                resourceAgentParameters={resourceAgent.parameters}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedResourceAgent>
  );
};

export default PrimitiveAttributes;
