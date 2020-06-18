import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import { LoadedFenceAgent, PcmkAgentAttrsList } from "app/view/common";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  return (
    <LoadedFenceAgent agentName={fenceDevice.agentName}>
      {(fenceAgent: types.pcmkAgents.FenceAgent) => (
        <StackItem>
          <PcmkAgentAttrsList
            agentAttributes={fenceDevice.arguments}
            resourceAgentParameters={fenceAgent.parameters}
          />
        </StackItem>
      )}
    </LoadedFenceAgent>
  );
};
