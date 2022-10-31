import {Alert} from "@patternfly/react-core";

import {selectors} from "app/store";
import {Clone} from "app/view/cluster/types";
import {
  CrmStatusTable,
  DetailViewSection,
  IssueList,
  Link,
  location,
  useClusterSelector,
} from "app/view/share";

type Member = Exclude<Clone["member"], {itemType: "fence-device"}>;

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
      <DetailViewSection>
        <IssueList issueList={issueList} hideEmpty>
          {member.itemType === "group"
            && member.resources.some(r => r.itemType === "fence-device") && (
              <Alert
                variant="danger"
                isInline
                title="Unsupported clone of group with fence device"
              >
                Cloned group with a fence device is not supported. Please remove
                the fence device from the group via pcs.
              </Alert>
            )}
        </IssueList>
      </DetailViewSection>

      <DetailViewSection caption="Memeber status">
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
      </DetailViewSection>
    </>
  );
};
