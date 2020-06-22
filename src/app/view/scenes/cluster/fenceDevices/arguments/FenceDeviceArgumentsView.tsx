import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import { LoadedPcmkAgent, PcmkAgentAttrsList } from "app/view/common";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  return (
    <LoadedPcmkAgent agentName={fenceDevice.agentName}>
      {(agent: types.pcmkAgents.Agent) => {
        return (
          <StackItem>
            <PcmkAgentAttrsList
              agentAttributes={fenceDevice.arguments}
              resourceAgentParameters={agent.parameters}
            />
          </StackItem>
        );
      }}
    </LoadedPcmkAgent>
  );
};
