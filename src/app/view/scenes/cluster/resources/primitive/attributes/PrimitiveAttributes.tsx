import React from "react";

import { types } from "app/store";

import PrimitiveAttributesView from "./PrimitiveAttributesView";
import { PrimitiveAttributesEdit } from "./form";
import LoadedResourceAgent from "./LoadedResourceAgent";

const PrimitiveAttributes = ({ primitive }: {
  primitive: types.cluster.Primitive,
}) => {
  const [isEditing, setIsEditing] = React.useState(true);
  return (
    <LoadedResourceAgent agentName={primitive.agentName}>
      {(resourceAgent: types.resourceAgents.ResourceAgentMetadata) => {
        if (isEditing) {
          return (
            <PrimitiveAttributesEdit
              primitive={primitive}
              resourceAgentParameters={resourceAgent.parameters}
              close={() => setIsEditing(false)}
            />
          );
        }

        return (
          <PrimitiveAttributesView
            primitive={primitive}
            resourceAgentParameters={resourceAgent.parameters}
            edit={() => setIsEditing(true)}
          />
        );
      }}
    </LoadedResourceAgent>
  );
};

export default PrimitiveAttributes;
