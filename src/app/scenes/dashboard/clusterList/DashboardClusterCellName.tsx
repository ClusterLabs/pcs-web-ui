import React from "react";

import { url } from "app/store";
import { Link } from "app/view";

export const DashboardClusterCellName: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link to={url.cluster.detail(clusterName)} />
    </th>
  );
};
