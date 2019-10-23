import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";
import { Spinner } from "app/common/components";

import * as selectors from "../selectors";
import PrimitiveParameter from "./PrimitiveParameter";

const PrimitiveAttributes = ({ primitive }: {
  primitive: Primitive,
}) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(
    primitive.agentName,
  ));

  return (
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
  );
};

export default PrimitiveAttributes;
