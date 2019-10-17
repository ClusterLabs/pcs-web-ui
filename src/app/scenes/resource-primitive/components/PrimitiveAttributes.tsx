import React from "react";
import { useSelector } from "react-redux";

import { Primitive, NVPair } from "app/services/cluster/types";
import { Spinner } from "app/common/components";

import * as selectors from "../selectors";

const PrimitiveAttributes = ({ primitive }: {
  primitive: Primitive,
}) => {
  const resourceAgent = useSelector(selectors.getResourceAgent(
    `${primitive.class}:${primitive.provider}:${primitive.type}`,
  ));

  // TODO who win in pacemaker? Last? First?
  // TODO store instance attributes directly in state
  const configuredParams = primitive.instanceAttributes.reduce(
    (attrMap, nvpair) => ({
      ...attrMap,
      [nvpair.name]: nvpair,
    }),
    {} as Record<NVPair["name"], NVPair>,
  );

  return (
    <div className="pf-c-content">
      {resourceAgent && (
        <dl>
          {resourceAgent.parameters.map(parameter => (
            <React.Fragment key={parameter.name}>
              <dt>{parameter.name}</dt>
              <dd>
                {
                  parameter.name in configuredParams
                    ? configuredParams[parameter.name].value
                    : ""
              }
              </dd>
            </React.Fragment>
          ))}
        </dl>
      )}
      {!resourceAgent && (
        <Spinner text="Loading resource agent data" />
      )}
    </div>
  );
};

export default PrimitiveAttributes;
