import React from "react";
import { Link } from "react-router-dom";
import {
  DataListCell,
  DataListContent,
  DataListItem,
  DataListToggle,
  DataListItemRow,
} from "@patternfly/react-core";

import DashboardClusterNodes from "./DashboardClusterNodes";
import DashboardClusterResources from "./DashboardClusterResources";
import DashboardClusterStatusIcon from "./DashboardClusterStatusIcon";
import DashboardClusterStonith from "./DashboardClusterStonith";
import DashboardClusterDetails from "./DashboardClusterDetails";

const DashboardCluster = ({ cluster }) => {
  const [isExpanded, setExpanded] = React.useState(false);
  return (
    <DataListItem
      data-role="cluster"
      aria-labelledby={cluster.name}
      isExpanded={isExpanded}
    >
      <DataListItemRow>
        <DataListToggle
          id={`dashboard-cluster-${cluster.name}-toggle`}
          onClick={() => setExpanded(!isExpanded)}
          isExpanded={isExpanded}
          aria-labelledby={
            `dashboard-cluster-${cluster.name}-toggle dashboard-cluster-${cluster.name}`
          }
          aria-label="Toggle details for"
        />
        <DataListCell isIcon key="icon" width={1}>
          <DashboardClusterStatusIcon status={cluster.status} />
        </DataListCell>
        <DataListCell width={2}>
          <Link
            id={`dashboard-cluster-${cluster.name}`}
            data-role="detail-link"
            to={`/cluster/${cluster.urlName}`}
          >
            {cluster.name}
          </Link>
        </DataListCell>
        <DataListCell width={1}>
          <DashboardClusterNodes
            nodeList={cluster.nodeList}
            clusterUrlName={cluster.urlName}
          />
        </DataListCell>
        <DataListCell width={1}>
          <DashboardClusterResources
            resourceList={cluster.resourceList}
            clusterUrlName={cluster.urlName}
          />
        </DataListCell>
        <DataListCell width={1}>
          <DashboardClusterStonith
            stonithList={cluster.stonithList}
            clusterUrlName={cluster.urlName}
          />
        </DataListCell>
      </DataListItemRow>
      {
        isExpanded && (

          <DataListContent
            isHidden={false}
            aria-label="Primary Content Details"
          >
            <DashboardClusterDetails cluster={cluster} />
          </DataListContent>
        )
      }
    </DataListItem>
  );
};
export default DashboardCluster;
