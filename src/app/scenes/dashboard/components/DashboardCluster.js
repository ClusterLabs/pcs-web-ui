import React from "react";
import {
  DataListCell,
  DataListContent,
  DataListItem,
  DataListToggle,
} from "@patternfly/react-core";

import DashboardClusterNodes from "./DashboardClusterNodes";
import DashboardClusterResources from "./DashboardClusterResources";
import DashboardClusterOverview from "./DashboardClusterOverview";
import DashboardClusterStonith from "./DashboardClusterStonith";
import DashboardClusterDetails from "./DashboardClusterDetails";

export default ({ cluster }) => {
  const [isExpanded, setExpanded] = React.useState(true);
  return (
    <DataListItem
      data-role="cluster"
      aria-labelledby={cluster.name}
      isExpanded={isExpanded}
    >
      <DataListToggle
        id={`dashboard-cluster-${cluster.name}-toggle`}
        onClick={() => setExpanded(!isExpanded)}
        isExpanded={isExpanded}
        aria-labelledby={
          `dashboard-cluster-${cluster.name}-toggle dashboard-cluster-${cluster.name}`
        }
        aria-label="Toggle details for"
      />
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
      {
        isExpanded && (
          <DataListContent aria-label="Primary Content Details">
            <DashboardClusterDetails cluster={cluster} />
          </DataListContent>
        )
      }
    </DataListItem>
  );
};
