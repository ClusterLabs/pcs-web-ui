import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import {
  IssueList,
  LoadedPcmkAgent,
  PcmkAgentDescription,
  useSelectedClusterName,
} from "app/view/share";

export const FenceDeviceDetailView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      <StackItem>
        <TextContent>
          <Text component="h1"> Description </Text>
        </TextContent>

        <LoadedPcmkAgent
          clusterName={clusterName}
          agentName={fenceDevice.agentName}
        >
          {agent => (
            <PcmkAgentDescription
              name={agent.name}
              shortdesc={agent.shortdesc}
              longdesc={agent.longdesc}
            />
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
