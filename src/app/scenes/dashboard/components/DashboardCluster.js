import React from "react";
import { Link } from "react-router-dom";
import {
  DataListCell,
  DataListContent,
  DataListItem,
  DataListToggle,
} from "@patternfly/react-core";

import DashboardClusterNodes from "./DashboardClusterNodes";
import DashboardClusterResources from "./DashboardClusterResources";
import DashboardClusterStatusIcon from "./DashboardClusterStatusIcon";
import DashboardClusterStonith from "./DashboardClusterStonith";
import DashboardClusterDetails from "./DashboardClusterDetails";

export default ({ cluster }) => {
  const [isExpanded, setExpanded] = React.useState(false);
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
        <DashboardClusterStatusIcon status={cluster.status} />
      </div>
      <DataListCell width={2}>
        <Link
          id={`dashboard-cluster-${cluster.name}`}
          data-role="detail-link"
          to={`/cluster/${cluster.name}`}
        >
          {cluster.name}
        </Link>
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
