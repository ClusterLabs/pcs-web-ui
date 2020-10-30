import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { selectors, types, url } from "app/store";
import { CrmStatusTable, IssueList, Link, useClusterSelector } from "app/view";

export const GroupDetail = ({ group }: { group: types.cluster.Group }) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForPrimitive,
    group.resources.map(r => r.id),
  );

  return (
    <>
      <StackItem>
        <IssueList issueList={group.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Member status </Text>
        </TextContent>

        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info for resources of group "${group.id}" found.`}
          rowObject={{
            header: "Resource / Node",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus => (
              <>
                <Link
                  to={url.cluster.resources(clusterName, crmStatus.resource.id)}
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
      </StackItem>
    </>
  );
};
