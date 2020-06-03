import React from "react";
import {
  Alert,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Expandable,
  StackItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { SearchIcon } from "@patternfly/react-icons";

import { selectors, types } from "app/store";
import { IssueList, Link, LoadedResourceAgent, pallete } from "app/view/common";

import {
  CrmStatusTable,
  useSelectedClusterName,
} from "app/view/scenes/cluster";

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

        <LoadedResourceAgent agentName={primitive.agentName}>
          {(resourceAgent: types.resourceAgents.ResourceAgentMetadata) => (
            <Alert isInline title={primitive.agentName} variant="info">
              {resourceAgent.shortdesc}
              <Expandable toggleText="Long description">
                <p>{resourceAgent.longdesc}</p>
              </Expandable>
            </Alert>
          )}
        </LoadedResourceAgent>
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
            <Title size="lg">{`No resource ${primitive.id} status info found.`}</Title>
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
                    to={`/cluster/${clusterName}/nodes/${crmStatus.node.name}`}
                  >
                    {crmStatus.node.name}
                  </Link>
                )),
            }}
          />
        )}
      </StackItem>
    </>
  );
};
