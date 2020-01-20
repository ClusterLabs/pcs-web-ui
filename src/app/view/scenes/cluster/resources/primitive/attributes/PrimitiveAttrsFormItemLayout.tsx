import React from "react";

import { types } from "app/store";

import PrimitiveAttrsHelpPopover from "./PrimitiveAttrsHelpPopover";

const PrimitiveAttrsFormItemLayout = (
  { resourceAgentParam, children }: React.PropsWithChildren<{
    resourceAgentParam: types.resourceAgents.ResourceAgentParameter;
  }>,
) => {
  return (
    <div className="pf-c-form__group">
      <span className="pf-c-form__label pf-u-pt-md">
        <span className="pf-c-form__label-text">
          {resourceAgentParam.name}
        </span>
        <span className="pf-c-form__label-required" aria-hidden="true">
          &#42;
          {" "}
        </span>
        <PrimitiveAttrsHelpPopover resourceAgentParam={resourceAgentParam} />
      </span>
      <div
        className="pf-c-form__horizontal-group"
        role="group"
        aria-labelledby={`resource-attribute-value-${resourceAgentParam.name}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PrimitiveAttrsFormItemLayout;
