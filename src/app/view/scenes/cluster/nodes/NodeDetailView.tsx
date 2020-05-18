import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { IssueList, Link } from "app/view/common";
import {
  CrmStatusTable,
  useSelectedClusterName,
} from "app/view/scenes/cluster";

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
          <Text component="h1"> Statuses of resources running on node </Text>
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
    </>
  );
};
