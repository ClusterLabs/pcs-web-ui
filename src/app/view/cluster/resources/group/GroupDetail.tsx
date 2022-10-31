import {selectors} from "app/store";
import {Group} from "app/view/cluster/types";
import {
  CrmStatusTable,
  DetailViewSection,
  IssueList,
  Link,
  location,
  useClusterSelector,
} from "app/view/share";

export const GroupDetail = ({group}: {group: Group}) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForPrimitive,
    group.resources.map(r => r.id),
  );

  return (
    <>
      <DetailViewSection>
        <IssueList issueList={group.issueList} hideEmpty />
      </DetailViewSection>

      <DetailViewSection caption="Member status">
        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info for resources of group "${group.id}" found.`}
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
