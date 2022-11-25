import {Primitive} from "app/view/cluster/types";
import {
  CrmStatusTable,
  DetailViewSection,
  IssueList,
  Link,
  LoadedPcmkAgent,
  PcmkAgentDescription,
  location,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {selectCrmStatusForPrimitives} from "app/view/cluster/resources/select";

export const PrimitiveDetail = ({primitive}: {primitive: Primitive}) => {
  const [crmStatusList, {name: clusterName}] = useLoadedCluster(
    selectCrmStatusForPrimitives([primitive.id]),
  );

  return (
    <>
      <DetailViewSection caption="Description">
        <LoadedPcmkAgent
          clusterName={clusterName}
          agentName={primitive.agentName}
        >
          {agent => (
            <PcmkAgentDescription
              name={agent.name}
              shortdesc={agent.shortdesc}
              longdesc={agent.longdesc}
            />
          )}
        </LoadedPcmkAgent>
      </DetailViewSection>

      {primitive.issueList.length > 0 && (
        <DetailViewSection caption="Issues">
          <IssueList issueList={primitive.issueList} hideEmpty />
        </DetailViewSection>
      )}

      <DetailViewSection caption="Status">
        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info form resource "${primitive.id}" found.`}
          rowObject={{
            header: "Node",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus =>
              !crmStatus.node ? null : (
                <Link
                  to={location.node({
                    clusterName,
                    nodeName: crmStatus.node.name,
                  })}
                />
              ),
          }}
        />
      </DetailViewSection>
    </>
  );
};
