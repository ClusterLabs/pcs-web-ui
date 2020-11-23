import React from "react";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view";
import { selectors } from "app/store";

import { NodeDetailPage } from "./NodeDetailPage";
import { NodeList } from "./NodeList";
import { NodeAddToolbarItem } from "./wizard";

export const NodesPage: React.FC<{ urlPrefix: string }> = ({ urlPrefix }) => {
  const [clusterStatus] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <NodeAddToolbarItem />
      </ClusterSectionToolbar>
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<NodeList nodeList={clusterStatus.nodeList} />}
        detailCard={<NodeDetailPage />}
      />
    </>
  );
};
