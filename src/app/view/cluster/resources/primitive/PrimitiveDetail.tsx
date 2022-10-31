import {selectors} from "app/store";
import {Primitive} from "app/view/cluster/types";
import {
  CrmStatusTable,
  DetailViewSection,
  IssueList,
  Link,
  LoadedPcmkAgent,
  PcmkAgentDescription,
  location,
  useClusterSelector,
} from "app/view/share";

export const PrimitiveDetail = ({primitive}: {primitive: Primitive}) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForPrimitive,
    [primitive.id],
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
