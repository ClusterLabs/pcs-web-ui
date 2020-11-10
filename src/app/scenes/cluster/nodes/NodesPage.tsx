import React from "react";

import { GroupDetailView, useClusterSelector } from "app/view";
import { selectors } from "app/store";

import { NodeDetailPage } from "./NodeDetailPage";
import { NodeList } from "./NodeList";
import { NodesToolbar } from "./NodesToolbar";

export const NodesPage: React.FC<{ urlPrefix: string }> = ({ urlPrefix }) => {
  const [clusterStatus] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <NodesToolbar />
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<NodeList nodeList={clusterStatus.nodeList} />}
        detailCard={<NodeDetailPage />}
      />
    </>
  );
};
