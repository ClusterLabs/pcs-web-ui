import React from "react";

import DataLoadingPage from "app/components/DataLoadingPage";

import ClusterPageContent from "./ClusterPageContent";

const ClusterDataPage = ({
  clusterUrlId,
  cluster,
  activeMenu,
  children,
  actions,
}) => (
  <DataLoadingPage
    loadingStatus={cluster.ui.initialLoading.status}
    loadingMsg={
      `Loading a status of the cluster '${cluster.ui.initialLoading.name}'.`
    }
    errorHeader={
      `Cannot load cluster '${cluster.ui.initialLoading.name}' data.`
    }
    errorMsg={cluster.ui.initialLoading.errorMsg}
    retry={() => actions.syncClusterData(clusterUrlId)}
  >
    <ClusterPageContent clusterName={cluster.data.name} activeMenu={activeMenu}>
      {children}
    </ClusterPageContent>
  </DataLoadingPage>
);
export default ClusterDataPage;
