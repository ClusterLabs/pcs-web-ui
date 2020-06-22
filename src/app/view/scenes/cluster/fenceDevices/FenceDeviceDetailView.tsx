import React from "react";
import {
  Alert,
  Expandable,
  StackItem,
  Text,
  TextContent,
} from "@patternfly/react-core";

import { types } from "app/store";
import { useSelectedClusterName } from "app/view/scenes/cluster";
import { IssueList, LoadedPcmkAgent } from "app/view/common";

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
          {(agent: types.pcmkAgents.Agent) => {
            return (
              <Alert isInline title={fenceDevice.agentName} variant="info">
                <TextContent>
                  <Text component="p">
                    {agent.shortdesc}
                    <Expandable toggleText="Full description">
                      {agent.longdesc.split("\n\n").map((line, i) => (
                        /* eslint-disable react/no-array-index-key */
                        <Text component="p" key={i}>
                          {line}
                        </Text>
                      ))}
                    </Expandable>
                  </Text>
                </TextContent>
              </Alert>
            );
          }}
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
