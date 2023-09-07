import React from "react";

import {ClusterStatusLabel, Link, location} from "app/view/share";

export const DashboardClusterCellName = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status: React.ComponentProps<typeof ClusterStatusLabel>["status"];
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link to={location.cluster({clusterName})}>
        <strong>{`${clusterName} `}</strong>{" "}
        <ClusterStatusLabel status={status} />
      </Link>
    </th>
  );
};
