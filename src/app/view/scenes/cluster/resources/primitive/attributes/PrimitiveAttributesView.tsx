import React from "react";

import { types } from "app/store";

import PrimitiveParameter from "./PrimitiveParameter";

const PrimitiveAttributesView = ({ primitive, resourceAgentParameters }: {
  primitive: types.cluster.Primitive;
  resourceAgentParameters: types.resourceAgents.ResourceAgentParameter[];
}) => {
  return (
    <div className="pf-c-content">
      <dl>
        {resourceAgentParameters.map(parameter => (
          <PrimitiveParameter
            key={parameter.name}
            instanceAttributes={primitive.instanceAttributes}
            resourceAgentParameter={parameter}
          />
        ))}
      </dl>
    </div>
  );
};

export default PrimitiveAttributesView;
