import React from "react";
import { useRouteMatch } from "react-router";

import { DashboardPage } from "app/scenes/dashboard";
import { AddClusterPage } from "app/scenes/dashboard-add-cluster";
import { ClusterDetailPage } from "app/scenes/cluster-detail";

import Scratch from "./Scratch";

const AppPage = () => {
  const dashboard = useRouteMatch({ exact: true, path: "/" });
  const addCluster = useRouteMatch({ exact: true, path: "/add-cluster" });
  const cluster = useRouteMatch<{name: string}>("/cluster/:name");
  const scratch = useRouteMatch({ exact: true, path: "/scratch" });

  if (cluster) {
    return (
      <ClusterDetailPage
        clusterUrlName={cluster.params.name}
        urlPrefix={cluster.url}
      />
    );
  }

  if (dashboard) {
    return <DashboardPage />;
  }

  if (addCluster) {
    return <AddClusterPage />;
  }

  if (scratch) {
    return <Scratch />;
  }

  return <div>404</div>;
};

export default AppPage;
