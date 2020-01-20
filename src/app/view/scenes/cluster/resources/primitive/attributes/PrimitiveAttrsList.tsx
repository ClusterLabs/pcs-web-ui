import React from "react";

import { types } from "app/store";

import PrimitiveAttrsListItem from "./PrimitiveAttrsListItem";

const PrimitiveAttrsList = ({ primitive, resourceAgentParameters }: {
  primitive: types.cluster.Primitive;
  resourceAgentParameters: types.resourceAgents.ResourceAgentParameter[];
}) => {
  return (
    <div className="pf-c-content">
      <dl>
        {resourceAgentParameters.map(parameter => (
          <PrimitiveAttrsListItem
            key={parameter.name}
            instanceAttributes={primitive.instanceAttributes}
            resourceAgentParam={parameter}
          />
        ))}
      </dl>
    </div>
  );
};

export default PrimitiveAttrsList;
