import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/store";
import { useSelectedClusterName } from "app/view/scenes/cluster";
import {
  IssueList,
  LoadedPcmkAgent,
  PcmkAgentDescription,
} from "app/view/common";

import { useFenceAgent } from "./useFenceAgent";

export const FenceDeviceDetailView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  useFenceAgent(useSelectedClusterName(), fenceDevice.agentName);
  return (
    <>
      <StackItem>
        <TextContent>
          <Text component="h1"> Description </Text>
        </TextContent>

        <LoadedPcmkAgent agentName={fenceDevice.agentName}>
          {(agent: types.pcmkAgents.Agent) => (
            <PcmkAgentDescription agent={agent} />
          )}
        </LoadedPcmkAgent>
      </StackItem>
      <StackItem>
        {fenceDevice.issueList.length > 0 && (
          <TextContent>
            <Text component="h1"> Issues </Text>
          </TextContent>
        )}
        <IssueList issueList={fenceDevice.issueList} hideEmpty />
      </StackItem>
    </>
  );
};
