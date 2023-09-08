import React from "react";

import {testMarks} from "app/view/dataTest";
import {Link, Table, location} from "app/view/share";

const {cluster: clusterMark} = testMarks.dashboard.clusterList;
const {name} = clusterMark;

export const DashboardCluster = (props: {
  clusterName: string;
  columns: React.ReactNode;
  status?: React.ReactNode;
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
          {props.status}
        </th>
        {props.columns}
      </tr>
      {props.expandedContent}
    </Table.Body>
  );
};
