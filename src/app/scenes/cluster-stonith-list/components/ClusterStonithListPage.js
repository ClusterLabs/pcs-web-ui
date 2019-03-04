import React from "react";

import withClusterState from "app/services/cluster/withClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterStonithList from "./ClusterStonithList";

export const ClusterStonithListPage = ({
  clusterUrlName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterStonithList
          stonithList={cluster.stonithList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterStonithListPage);
