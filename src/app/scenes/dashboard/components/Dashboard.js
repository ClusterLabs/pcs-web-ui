import React from "react";
import { DataList } from "@patternfly/react-core";

import DashboardCluster from "./DashboardCluster";

export default ({ dashboard }) => (
  <DataList aria-label="Cluster list" data-role="cluster-list">
    {dashboard.clusterList.map(cluster => (
      <DashboardCluster cluster={cluster} key={cluster.name} />
    ))}
  </DataList>
);
