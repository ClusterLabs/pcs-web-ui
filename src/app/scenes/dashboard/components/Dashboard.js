import React from "react";
import { Link } from "react-router-dom";
import {
  DataList,
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";


export default ({ dashboard }) => (
  <DataList aria-label="Cluster list" data-role="cluster-list">
    {dashboard.clusterList.map(cluster => (
      <DataListItem
        data-role="cluster"
        data-role-key={cluster.name}
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
