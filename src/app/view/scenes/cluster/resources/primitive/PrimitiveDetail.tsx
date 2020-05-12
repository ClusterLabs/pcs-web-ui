import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { IssueList } from "app/view/common";
import { CrmStatusTable, useSelectedCluster } from "app/view/scenes/cluster";

export const PrimitiveDetail = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const crmStatusList = useSelector(
    selectors.crmStatusForPrimitive(useSelectedCluster(), primitive.id),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={primitive.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Resource status on nodes </Text>
        </TextContent>
        <CrmStatusTable
          crmStatusList={crmStatusList}
          rowObject={{
            header: "Node",
            cell: crmStatus => crmStatus.node?.name,
          }}
        />
      </StackItem>
    </>
  );
};
