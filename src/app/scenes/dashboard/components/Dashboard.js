import React from "react";
import { Link } from "react-router-dom";
import {
  DataList,
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";


export default ({ dashboard }) => (
  <DataList aria-label="Cluster list">
    {dashboard.dashboardData.clusterList.map(cluster => (
      <DataListItem
        key={cluster.name}
        aria-labelledby={cluster.name}
      >
        <DataListCell>
          <Link to={`/cluster/${cluster.name}`}>{cluster.name}</Link>
        </DataListCell>
      </DataListItem>
    ))}
  </DataList>
);
