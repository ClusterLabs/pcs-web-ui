import {EmptyStateError, EmptyStateNoItem, IssueList} from "app/view/share";
import {DetailViewSection, useLoadedCluster} from "app/view/cluster/share";
import type {Node} from "app/view/cluster/types";

import {NodeDaemonTable} from "./NodeDaemonTable";
import {NodeClusterServicesView} from "./services";
import {NodeDetailCrmStatusTable} from "./NodeDetailCrmStatusTable";

export const NodeDetailView = ({node}: {node: Node}) => {
  const {resourceOnNodeStatusList} = useLoadedCluster();
  const crmStatusList = resourceOnNodeStatusList.filter(
    s => s.node?.name === node.name,
  );

  return (
    <>
      <DetailViewSection>
        <IssueList issueList={node.issueList} hideEmpty />
      </DetailViewSection>
      <DetailViewSection caption="Resource status">
        {crmStatusList.length === 0 ? (
          <EmptyStateNoItem
            title={`No resource running on node "${node.name}".`}
            canAdd={false}
          />
        ) : (
          <NodeDetailCrmStatusTable crmStatusList={crmStatusList} />
        )}
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
