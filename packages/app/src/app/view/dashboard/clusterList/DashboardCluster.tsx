import React from "react";

import {dataTest} from "app/view/dataTest";
import {ClusterStatusLabel, Link, Table, location} from "app/view/share";

export const DashboardCluster = ({
  clusterName,
  status,
  columns,
  isLoading,
  isExpanded,
  expandedContent,
}: {
  clusterName: string;
  status: React.ComponentProps<typeof ClusterStatusLabel>["status"];
  columns: React.ReactNode;
  isLoading?: boolean;
  isExpanded?: boolean;
  expandedContent?: React.ReactNode;
}) => {
  return (
    <Table.Body
      isExpanded={isExpanded}
      data-test={dataTest("dashboard.cluster-list.cluster")}
    >
      <tr
        role="row"
        {...(isLoading
          ? {}
          : {"data-test": dataTest("dashboard.cluster-list.cluster.loaded")})}
      >
        <th role="rowheader">
          <Link to={location.cluster({clusterName})}>
            <strong data-test={dataTest("dashboard.cluster-list.cluster.name")}>
              {clusterName}
            </strong>{" "}
            <ClusterStatusLabel status={status} />
          </Link>
        </th>
        {columns}
      </tr>
      {expandedContent}
    </Table.Body>
  );
};
