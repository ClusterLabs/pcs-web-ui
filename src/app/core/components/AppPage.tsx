import React from "react";
import { useRouteMatch } from "react-router";

import { DashboardPage } from "app/scenes/dashboard";
import { ClusterDetailPage } from "app/scenes/cluster-detail";

import Scratch from "./Scratch";

const AppPage = () => {
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
  if (scratch) {
    return <Scratch />;
  }

  return <DashboardPage urlPrefix="/" />;
};

export default AppPage;
