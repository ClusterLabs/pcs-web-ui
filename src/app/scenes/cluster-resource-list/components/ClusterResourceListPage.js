import React from "react";

import withClusterState from "app/services/cluster/withClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ResourceList from "./ResourceList";

export const ClusterResourceListPage = ({
  clusterName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterName);
  return (
    <ClusterPage clusterName={clusterName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ResourceList
          resourceList={cluster.resourceList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterResourceListPage);
