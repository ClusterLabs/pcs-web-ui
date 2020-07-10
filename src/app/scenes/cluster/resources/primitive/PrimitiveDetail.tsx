import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { SearchIcon } from "@patternfly/react-icons";

import { selectors, types, url } from "app/store";
import {
  CrmStatusTable,
  IssueList,
  Link,
  LoadedPcmkAgent,
  PcmkAgentDescription,
  pallete,
  useSelectedClusterName,
} from "app/view";

export const PrimitiveDetail = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const clusterName = useSelectedClusterName();
  const crmStatusList = useSelector(
    selectors.crmStatusForPrimitive(useSelectedClusterName(), [primitive.id]),
  );
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
          <Text component="h1"> Resource status on nodes </Text>
        </TextContent>

        {crmStatusList.length === 0 && (
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon icon={SearchIcon} color={pallete.UNKNOWN} />
            <Title size="lg" headingLevel="h3">
              {`No resource ${primitive.id} status info found.`}
            </Title>
            <EmptyStateBody>
              {`No resource ${primitive.id} status info found.`}
            </EmptyStateBody>
          </EmptyState>
        )}

        {crmStatusList.length > 0 && (
          <CrmStatusTable
            crmStatusList={crmStatusList}
            rowObject={{
              header: "Node",
              cell: crmStatus =>
                (!crmStatus.node ? null : (
                  <Link
                    to={url.cluster.nodes(clusterName, crmStatus.node.name)}
                  />
                )),
            }}
          />
        )}
      </StackItem>
    </>
  );
};
