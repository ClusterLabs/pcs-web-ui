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

type Member = Exclude<Clone["member"], { itemType: "fence-device" }>;

export const CloneDetail = ({
  id,
  member,
  issueList,
}: {
  id: string;
  member: Member;
  issueList: Clone["issueList"];
}) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForPrimitive,
    member.itemType === "primitive"
      ? [member.id]
      : member.resources.map(r => r.id),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Member status </Text>
        </TextContent>

        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info for clone "${id}" found.`}
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
