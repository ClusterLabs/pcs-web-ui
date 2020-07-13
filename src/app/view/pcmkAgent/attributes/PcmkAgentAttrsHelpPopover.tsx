import React from "react";

import { AttributeHelpPopover } from "app/view/AttributeHelpPopover";

import { types } from "app/store";

export const PcmkAgentAttrsHelpPopover = ({
  resourceAgentParam,
}: {
  resourceAgentParam: types.pcmkAgents.AgentParameter;
}) => {
  return (
    <AttributeHelpPopover
      header={resourceAgentParam.shortdesc}
      body={resourceAgentParam.longdesc}
      defaultValue={resourceAgentParam.default}
    />
  );
};
