import {testMarks} from "app/view/dataTest";
import {Primitive} from "app/view/cluster/types";
import {CrmStatusTable, IssueList, Link, location} from "app/view/share";
import {
  DetailViewSection,
  PcmkAgentDescription,
  useLoadedCluster,
} from "app/view/cluster/share";
import {LoadedPcmkAgent} from "app/view/share";

const {detail} = testMarks.cluster.resources.currentPrimitive;

export const PrimitiveDetail = ({primitive}: {primitive: Primitive}) => {
  const {resourceOnNodeStatusList, clusterName} = useLoadedCluster();
  const crmStatusList = resourceOnNodeStatusList.filter(
    s => s.resource.id === primitive.id,
  );

  return (
    <span {...detail.mark}>
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
    </span>
  );
};
