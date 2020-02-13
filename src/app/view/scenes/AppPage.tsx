import React from "react";
import { useRouteMatch } from "react-router";

import { ClusterDetailPage } from "./cluster";
import { DashboardPage } from "./dashboard";
import { Scratch } from "./Scratch";

export const AppPage = () => {
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
