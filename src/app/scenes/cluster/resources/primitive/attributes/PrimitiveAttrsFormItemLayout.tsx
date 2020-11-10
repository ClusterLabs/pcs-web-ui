import React from "react";

import { types } from "app/store";
import { PcmkAgentAttrsHelpPopover } from "app/view";

export const PrimitiveAttrsFormItemLayout = ({
  resourceAgentParam,
  required,
  children,
}: React.PropsWithChildren<{
  required: boolean;
  resourceAgentParam: types.pcmkAgents.ResourceAgentParameter;
}>) => {
  return (
    <div className="pf-c-form__group">
      <span className="pf-c-form__label pf-u-pt-md">
        <span className="pf-c-form__label-text">{resourceAgentParam.name}</span>
        {required && (
          <span className="pf-c-form__label-required" aria-hidden="true">
            &#42;
          </span>
        )}{" "}
        <PcmkAgentAttrsHelpPopover resourceAgentParam={resourceAgentParam} />
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
