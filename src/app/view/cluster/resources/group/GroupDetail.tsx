import {Group} from "app/view/cluster/types";
import {
  CrmStatusTable,
  DetailViewSection,
  IssueList,
  Link,
  location,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {selectCrmStatusForPrimitives} from "app/view/cluster/resources/select";

export const GroupDetail = ({group}: {group: Group}) => {
  const [crmStatusList, {name: clusterName}] = useLoadedCluster(
    selectCrmStatusForPrimitives(group.resources.map(r => r.id)),
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
