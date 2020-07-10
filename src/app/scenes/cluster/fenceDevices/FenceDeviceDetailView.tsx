import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/store";
import {
  IssueList,
  LoadedPcmkAgent,
  PcmkAgentDescription,
} from "app/view";

import { useSelectedClusterName } from "app/scenes";

export const FenceDeviceDetailView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      <StackItem>
        <TextContent>
          <Text component="h1"> Description </Text>
        </TextContent>

        <LoadedPcmkAgent
          clusterUrlName={clusterName}
          agentName={fenceDevice.agentName}
        >
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
