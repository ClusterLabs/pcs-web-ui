import React from "react";

import { Primitive } from "app/services/cluster/types";

import { ResourceAgentParameter } from "../types";

const PrimitiveParameter = ({ resourceAgentParameter, instanceAttributes }: {
  resourceAgentParameter: ResourceAgentParameter;
  instanceAttributes: Primitive["instanceAttributes"];
}) => (
  <>
    <dt>{resourceAgentParameter.name}</dt>
    {resourceAgentParameter.name in instanceAttributes && (
      <dd>{instanceAttributes[resourceAgentParameter.name].value}</dd>
    )}
    {
      !(resourceAgentParameter.name in instanceAttributes)
      &&
      resourceAgentParameter.default
      && (
        <dd style={{ color: "var(--pf-global--Color--200)" }}>
          <div>{resourceAgentParameter.default}</div>
          <div style={{ fontStyle: "italic" }}>Default value</div>
        </dd>
      )
    }
  </>
);

export default PrimitiveParameter;
