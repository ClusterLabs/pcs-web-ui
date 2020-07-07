import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  usePcmkAgentAttrsFilter,
} from "app/view/common";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const {
    importances,
    setImportances,
    attributeNameSearch,
    setAttributeNameSearch,
    filterParameters,
  } = usePcmkAgentAttrsFilter();
  return (
    <LoadedPcmkAgent agentName={fenceDevice.agentName}>
      {(agent: types.pcmkAgents.Agent) => {
        return (
          <>
            <StackItem>
              <PcmkAgentAttrsToolbar
                attributeNameSearch={attributeNameSearch}
                setAttributeNameSearch={setAttributeNameSearch}
                importances={importances}
                setImportances={setImportances}
              />
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
