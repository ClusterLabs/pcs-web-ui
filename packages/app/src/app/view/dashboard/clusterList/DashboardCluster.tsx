import React from "react";

import {testMarks} from "app/view/dataTest";
import {ClusterStatusLabel, Link, Table, location} from "app/view/share";

const testMarksCluster = testMarks.dashboard.clusterList.cluster;
const {loaded, name} = testMarksCluster;

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
    <Table.Body isExpanded={isExpanded} {...testMarksCluster.mark}>
      <tr role="row" {...(isLoading ? {} : loaded.mark)}>
        <th role="rowheader">
          <Link to={location.cluster({clusterName})}>
            <strong {...name.mark}>{clusterName}</strong>{" "}
            <ClusterStatusLabel status={status} />
          </Link>
        </th>
        {columns}
      </tr>
      {expandedContent}
    </Table.Body>
  );
};
