import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

import DashboardClusterNodes from "./DashboardClusterNodes";
import DashboardClusterResources from "./DashboardClusterResources";
import DashboardClusterOverview from "./DashboardClusterOverview";
import DashboardClusterStonith from "./DashboardClusterStonith";


export default ({ cluster }) => (
  <DataListItem
    data-role="cluster"
    aria-labelledby={cluster.name}
  >
    <div className="pf-c-data-list__check">
      <DashboardClusterOverview.Icon status={cluster.status} />
    </div>
    <DataListCell width={2}>
      <DashboardClusterOverview cluster={cluster} />
    </DataListCell>
    <DataListCell>
      <DashboardClusterNodes
        nodeList={cluster.nodeList}
        clusterName={cluster.name}
      />
    </DataListCell>
    <DataListCell>
      <DashboardClusterResources
        resourceList={cluster.resourceList}
        clusterName={cluster.name}
      />
    </DataListCell>
    <DataListCell>
      <DashboardClusterStonith
        stonithList={cluster.stonithList}
        clusterName={cluster.name}
      />
    </DataListCell>
  </DataListItem>
);
