import React from "react";

import { types } from "app/store";

import { PrimitiveAttrsHelpPopover } from "./PrimitiveAttrsHelpPopover";

export const PrimitiveAttrsListItem = ({
  resourceAgentParam,
  instanceAttributes,
}: {
  resourceAgentParam: types.pcmkAgents.ResourceAgentParameter;
  instanceAttributes: types.cluster.Primitive["instanceAttributes"];
}) => (
  <>
    <dt>
      {`${resourceAgentParam.name} `}
      <PrimitiveAttrsHelpPopover resourceAgentParam={resourceAgentParam} />
    </dt>
    {resourceAgentParam.name in instanceAttributes && (
      <dd>{instanceAttributes[resourceAgentParam.name].value}</dd>
    )}
    {!(resourceAgentParam.name in instanceAttributes)
      && resourceAgentParam.default && (
        <dd style={{ color: "var(--pf-global--Color--200)" }}>
          <div>{resourceAgentParam.default}</div>
          <div style={{ fontStyle: "italic" }}>Default value</div>
        </dd>
    )}
  </>
);
