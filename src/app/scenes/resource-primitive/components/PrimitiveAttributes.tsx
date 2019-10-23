import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";
import { Spinner } from "app/common/components";

import * as selectors from "../selectors";

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
            <React.Fragment key={parameter.name}>
              <dt>{parameter.name}</dt>
              <dd>
                {
                  parameter.name in primitive.instanceAttributes
                    ? primitive.instanceAttributes[parameter.name].value
                    : ""
              }
              </dd>
            </React.Fragment>
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
