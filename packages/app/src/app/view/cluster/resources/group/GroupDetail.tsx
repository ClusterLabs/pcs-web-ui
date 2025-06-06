import type {Group} from "app/view/cluster/types";
import {CrmStatusTable, IssueList, Link, location} from "app/view/share";
import {DetailViewSection, useLoadedCluster} from "app/view/cluster/share";

export const GroupDetail = ({group}: {group: Group}) => {
  const {resourceOnNodeStatusList, clusterName} = useLoadedCluster();
  const primitiveIds = group.resources.map(r => r.id);
  const crmStatusList = resourceOnNodeStatusList.filter(s =>
    primitiveIds.includes(s.resource.id),
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
