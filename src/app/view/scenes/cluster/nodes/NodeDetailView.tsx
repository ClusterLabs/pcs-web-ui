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
import { ExclamationCircleIcon } from "@patternfly/react-icons";

import { selectors, types } from "app/store";
import { IssueList, Link, pallete } from "app/view/common";
import {
  CrmStatusTable,
  useSelectedClusterName,
} from "app/view/scenes/cluster";

import { NodeDaemonTable } from "./NodeDaemonTable";

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
        <CrmStatusTable
          crmStatusList={crmStatusList}
          rowObject={{
            header: "Resource",
            cell: crmStatus => (
              <Link
                to={`/cluster/${clusterName}/resources/${crmStatus.resource.id}`}
              >
                {crmStatus.resource.id}
              </Link>
            ),
          }}
        />
      </StackItem>
      {node.status === "DATA_NOT_PROVIDED" && (
        <StackItem>
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon
              icon={ExclamationCircleIcon}
              color={pallete.ERROR}
            />
            <Title size="lg">{`No data for node ${node.name}.`}</Title>
            <EmptyStateBody>
              {`Data for node ${node.name} are not provided by backend`}
            </EmptyStateBody>
          </EmptyState>
        </StackItem>
      )}
      {node.status !== "DATA_NOT_PROVIDED" && (
        <StackItem>
          <TextContent>
            <Text component="h1"> Cluster Daemons </Text>
          </TextContent>
          <NodeDaemonTable services={node.services} />
        </StackItem>
      )}
    </>
  );
};
