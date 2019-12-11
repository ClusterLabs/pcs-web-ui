import React from "react";
import { useSelector } from "react-redux";
import { Alert, StackItem } from "@patternfly/react-core";

import { types, selectors } from "app/store";
import { Spinner } from "app/view/common";

import PrimitiveParameter from "./PrimitiveParameter";

const PrimitiveAttributes = ({ primitive }: {
  primitive: types.cluster.Primitive,
}) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(
    primitive.agentName,
  ));

  return (
    <StackItem>
      <div className="pf-c-content">
        {
        resourceAgent
        &&
        ["LOADED", "RELOADING"].includes(resourceAgent.loadStatus)
        && (
        <dl>
          {resourceAgent.parameters.map(parameter => (
            <PrimitiveParameter
              key={parameter.name}
              instanceAttributes={primitive.instanceAttributes}
              resourceAgentParameter={parameter}
            />
          ))}
        </dl>
        )}
        {(!resourceAgent || resourceAgent.loadStatus === "LOADING") && (
        <Spinner text="Loading resource agent data" />
        )}
        {resourceAgent && resourceAgent.loadStatus === "FAILED" && (
        <Alert
          isInline
          variant="danger"
          title={
            `Cannot load metadata of resource agent "${primitive.agentName}"`
          }
        />
        )}
      </div>
    </StackItem>
  );
};

export default PrimitiveAttributes;
