import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import * as location from "app/scenes/location";
import { selectors, types } from "app/store";
import {
  CrmStatusTable,
  EmptyStateError,
  IssueList,
  Link,
  useClusterSelector,
} from "app/view";

import { NodeDaemonTable } from "./NodeDaemonTable";
import { NodeClusterServicesView } from "./services";

export const NodeDetailView = ({ node }: { node: types.cluster.Node }) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForNode,
    node.name,
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={node.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1">Resource status</Text>
        </TextContent>

        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No resource running on node "${node.name}".`}
          rowObject={{
            header: "Resource",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus => (
              <Link
                to={location.resource({
                  clusterName,
                  resourceId: crmStatus.resource.id,
                })}
              />
            ),
          }}
        />
      </StackItem>
      {node.status === "DATA_NOT_PROVIDED" && (
        <StackItem>
          <TextContent>
            <Text component="h1"> Node Daemons </Text>
          </TextContent>
          <EmptyStateError
            title={`No data for node ${node.name}.`}
            message={`Data for node ${node.name} are not provided by backend`}
          />
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
