import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  usePcmkAgentAttrsFilter,
} from "app/view/common";

import { useSelectedClusterName } from "app/view/scenes/cluster";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const clusterName = useSelectedClusterName();
  const { filters, filterParameters } = usePcmkAgentAttrsFilter();
  return (
    <LoadedPcmkAgent
      clusterUrlName={clusterName}
      agentName={fenceDevice.agentName}
    >
      {(agent: types.pcmkAgents.Agent) => {
        return (
          <>
            <StackItem>
              <PcmkAgentAttrsToolbar filters={filters} />
            </StackItem>
            <StackItem>
              <PcmkAgentAttrsList
                agentAttributes={fenceDevice.arguments}
                resourceAgentParameters={filterParameters(agent.parameters)}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedPcmkAgent>
  );
};
