import React from "react";
import { useSelector } from "react-redux";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, SearchIcon } from "@patternfly/react-icons";

import { selectors, types, url } from "app/store";
import { IssueList, Link, pallete } from "app/view/common";
import {
  CrmStatusTable,
  useSelectedClusterName,
} from "app/view/scenes/cluster";

import { NodeDaemonTable } from "./NodeDaemonTable";
import { NodeClusterServicesView } from "./services";

export const NodeDetailView = ({ node }: { node: types.cluster.Node }) => {
  const clusterName = useSelectedClusterName();
  const crmStatusList = useSelector(
    selectors.crmStatusForNode(clusterName, node.name),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={node.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1">Resources on node</Text>
        </TextContent>

        {crmStatusList.length === 0 && (
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon icon={SearchIcon} color={pallete.UNKNOWN} />
            <Title size="lg" headingLevel="h3">
              {`No resource running on node ${node.name}.`}
            </Title>
            <EmptyStateBody>
              {`No resource running on node ${node.name}.`}
            </EmptyStateBody>
          </EmptyState>
        )}

        {crmStatusList.length > 0 && (
          <CrmStatusTable
            crmStatusList={crmStatusList}
            rowObject={{
              header: "Resource",
              cell: crmStatus => (
                <Link
                  to={url.cluster.resources(clusterName, crmStatus.resource.id)}
                />
              ),
            }}
          />
        )}
      </StackItem>
      {node.status === "DATA_NOT_PROVIDED" && (
        <StackItem>
          <TextContent>
            <Text component="h1"> Node Daemons </Text>
          </TextContent>
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon
              icon={ExclamationCircleIcon}
              color={pallete.ERROR}
            />
            <Title
              size="lg"
              headingLevel="h3"
            >
              {`No data for node ${node.name}.`}
            </Title>
            <EmptyStateBody>
              {`Data for node ${node.name} are not provided by backend`}
            </EmptyStateBody>
          </EmptyState>
        </StackItem>
      )}
      {node.status !== "DATA_NOT_PROVIDED" && (
        <>
          <StackItem>
            <TextContent>
              <Text component="h1"> Node Daemons </Text>
            </TextContent>
            <NodeDaemonTable services={node.services} />
          </StackItem>
          <StackItem>
            <NodeClusterServicesView node={node} />
          </StackItem>
        </>
      )}
    </>
  );
};
