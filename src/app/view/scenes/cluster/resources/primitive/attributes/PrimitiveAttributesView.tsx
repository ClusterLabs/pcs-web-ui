import React from "react";
import {
  Button,
  StackItem,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { types } from "app/store";

import PrimitiveParameter from "./PrimitiveParameter";

const PrimitiveAttributesView = ({ primitive, resourceAgentParameters, edit }: {
  primitive: types.cluster.Primitive;
  resourceAgentParameters: types.resourceAgents.ResourceAgentParameter[];
  edit: () => void;
}) => {
  return (
    <>
      <StackItem>
        <Toolbar className="pf-l-toolbar">
          <ToolbarGroup>
            <ToolbarItem>
              <Button onClick={edit}>Edit Attributes</Button>
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      </StackItem>
      <StackItem>
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
      </StackItem>
    </>
  );
};

export default PrimitiveAttributesView;
