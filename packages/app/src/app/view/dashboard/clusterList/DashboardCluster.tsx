import React from "react";

import {testMarks} from "app/view/dataTest";
import {ClusterStatusLabel, Link, Table, location} from "app/view/share";

const {cluster: clusterMark} = testMarks.dashboard.clusterList;
const {name, status} = clusterMark;

export const DashboardCluster = (props: {
  clusterName: string;
  status: React.ComponentProps<typeof ClusterStatusLabel>["status"];
  columns: React.ReactNode;
  isLoading?: boolean;
  isExpanded?: boolean;
  expandedContent?: React.ReactNode;
}) => {
  return (
    <Table.Body isExpanded={props.isExpanded} {...clusterMark.mark}>
      <tr role="row">
        <th role="rowheader">
          <Link to={location.cluster({clusterName: props.clusterName})}>
            <strong {...name.mark}>{props.clusterName}</strong>{" "}
          </Link>
          <ClusterStatusLabel status={props.status} {...status.mark} />
        </th>
        {props.columns}
      </tr>
      {props.expandedContent}
    </Table.Body>
  );
};
