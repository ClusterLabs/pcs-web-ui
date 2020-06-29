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
import { SearchIcon } from "@patternfly/react-icons";

import { selectors, types, url } from "app/store";
import { IssueList, Link, pallete } from "app/view/common";
import {
  CrmStatusTable,
  useSelectedClusterName,
} from "app/view/scenes/cluster";

export const CloneDetail = ({ clone }: { clone: types.cluster.Clone }) => {
  const clusterName = useSelectedClusterName();
  const crmStatusList = useSelector(
    selectors.crmStatusForPrimitive(
      useSelectedClusterName(),
      clone.member.itemType === "primitive"
        ? [clone.member.id]
        : clone.member.resources.map(r => r.id),
    ),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={clone.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Members statuses on nodes </Text>
        </TextContent>

        {crmStatusList.length === 0 && (
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon icon={SearchIcon} color={pallete.UNKNOWN} />
            <Title size="lg">
              {`No status info for clone ${clone.id} found.`}
            </Title>
            <EmptyStateBody>
              {`No status info for clone ${clone.id} found.`}
            </EmptyStateBody>
          </EmptyState>
        )}

        {crmStatusList.length > 0 && (
          <CrmStatusTable
            crmStatusList={crmStatusList}
            rowObject={{
              header: "Resource / Node",
              cell: crmStatus => (
                <>
                  <Link
                    to={
                      url.cluster.resources(clusterName, crmStatus.resource.id)
                    }
                  />
                  {crmStatus.node && (
                    <>
                      <span>{" / "}</span>
                      <Link
                        to={url.cluster.nodes(clusterName, crmStatus.node.name)}
                      />
                    </>
                  )}
                </>
              ),
            }}
          />
        )}
      </StackItem>
    </>
  );
};
