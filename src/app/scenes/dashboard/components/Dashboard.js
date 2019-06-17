import React from "react";

import { Table } from "app/components";

import DashboardCluster from "./DashboardCluster";

export default ({ dashboard }) => (
  <Table isExpandable data-role="cluster-list">
    <thead>
      <tr>
        <th>Clusters</th>
        <th>Issues</th>
        <th>Nodes</th>
        <th>Resources</th>
        <th>Fence devices</th>
      </tr>
    </thead>
    {dashboard.clusterList.map(cluster => (
      <DashboardCluster key={cluster.name} cluster={cluster} />
    ))}
  </Table>
);
