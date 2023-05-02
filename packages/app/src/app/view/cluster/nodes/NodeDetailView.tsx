import {
  CrmStatusTable,
  DetailViewSection,
  EmptyStateError,
  IssueList,
  Link,
  location,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {Node} from "app/view/cluster/types";

import {NodeDaemonTable} from "./NodeDaemonTable";
import {NodeClusterServicesView} from "./services";

export const NodeDetailView = ({node}: {node: Node}) => {
  const {resourceOnNodeStatusList, clusterName} = useLoadedCluster();
  const crmStatusList = resourceOnNodeStatusList.filter(
    s => s.node?.name === node.name,
  );

  return (
    <>
      <DetailViewSection>
        <IssueList issueList={node.issueList} hideEmpty />
      </DetailViewSection>
      <DetailViewSection caption="Resource status">
        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No resource running on node "${node.name}".`}
          rowObject={{
            header: "Resource",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus => (
              <Link
                to={location.resource({
                  clusterName,
                  resourceId: crmStatus.resource.id,
                })}
              />
            ),
          }}
        />
      </DetailViewSection>
      {node.status === "DATA_NOT_PROVIDED" && (
        <DetailViewSection caption="Node Daemons">
          <EmptyStateError
            title={`No data for node ${node.name}.`}
            message={`Data for node ${node.name} are not provided by backend`}
          />
        </DetailViewSection>
      )}
      {node.status !== "DATA_NOT_PROVIDED" && (
        <>
          <DetailViewSection caption="Node Daemons">
            <NodeDaemonTable services={node.services} />
          </DetailViewSection>
          <DetailViewSection>
            <NodeClusterServicesView node={node} />
          </DetailViewSection>
        </>
      )}
    </>
  );
};
