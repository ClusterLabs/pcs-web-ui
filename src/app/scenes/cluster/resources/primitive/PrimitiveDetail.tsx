import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { selectors, types, url } from "app/store";
import {
  CrmStatusTable,
  IssueList,
  Link,
  LoadedPcmkAgent,
  PcmkAgentDescription,
  useClusterSelector,
} from "app/view";

export const PrimitiveDetail = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const [
    crmStatusList,
    clusterName,
  ] = useClusterSelector(selectors.crmStatusForPrimitive, [primitive.id]);
  return (
    <>
      <StackItem>
        <TextContent>
          <Text component="h1"> Description </Text>
        </TextContent>

        <LoadedPcmkAgent
          clusterUrlName={clusterName}
          agentName={primitive.agentName}
        >
          {(agent: types.pcmkAgents.Agent) => (
            <PcmkAgentDescription agent={agent} />
          )}
        </LoadedPcmkAgent>
      </StackItem>
      <StackItem>
        {primitive.issueList.length > 0 && (
          <TextContent>
            <Text component="h1"> Issues </Text>
          </TextContent>
        )}
        <IssueList issueList={primitive.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Status </Text>
        </TextContent>

        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info form resource "${primitive.id}" found.`}
          rowObject={{
            header: "Node",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus =>
              !crmStatus.node ? null : (
                <Link
                  to={url.cluster.nodes(clusterName, crmStatus.node.name)}
                />
              ),
          }}
        />
      </StackItem>
    </>
  );
};
