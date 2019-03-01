import React from "react";

import withClusterState from "app/services/cluster/withClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterStonithList from "./ClusterStonithList";

export const ClusterStonithListPage = ({
  clusterName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterName);
  return (
    <ClusterPage clusterName={clusterName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterStonithList
          stonithList={cluster.stonithList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterStonithListPage);
