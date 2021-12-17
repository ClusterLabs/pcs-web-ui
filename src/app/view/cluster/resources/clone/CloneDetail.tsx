import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { selectors } from "app/store";
import { Clone } from "app/view/cluster/types";
import {
  CrmStatusTable,
  IssueList,
  Link,
  location,
  useClusterSelector,
} from "app/view/share";

export const CloneDetail: React.FC<{ clone: Clone }> = ({ clone }) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForPrimitive,
    clone.member.itemType === "primitive"
      ? [clone.member.id]
      : clone.member.resources.map(r => r.id),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={clone.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Member status </Text>
        </TextContent>

        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info for clone "${clone.id}" found.`}
          rowObject={{
            header: "Resource / Node",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus => (
              <>
                <Link
                  to={location.resource({
                    clusterName,
                    resourceId: crmStatus.resource.id,
                  })}
                />
                {crmStatus.node && (
                  <>
                    <span>{" / "}</span>
                    <Link
                      to={location.node({
                        clusterName,
                        nodeName: crmStatus.node.name,
                      })}
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
