import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { IssueList } from "app/view/common";
import {
  CrmStatusTable,
  useSelectedClusterName,
} from "app/view/scenes/cluster";

export const NodeDetailView = ({ node }: { node: types.cluster.Node }) => {
  const crmStatusList = useSelector(
    selectors.crmStatusForNode(useSelectedClusterName(), node.name),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={node.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Resource status on node </Text>
        </TextContent>
        <CrmStatusTable
          crmStatusList={crmStatusList}
          rowObject={{
            header: "Resource",
            cell: crmStatus => crmStatus.resource.id,
          }}
        />
      </StackItem>
    </>
  );
};
