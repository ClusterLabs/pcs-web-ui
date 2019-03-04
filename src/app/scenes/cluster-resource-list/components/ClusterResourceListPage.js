import React from "react";

import withClusterState from "app/services/cluster/withClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ResourceList from "./ResourceList";

export const ClusterResourceListPage = ({
  clusterUrlName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ResourceList
          resourceList={cluster.resourceList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterResourceListPage);
