import React from "react";

import { Link } from "app/view/common";

export const DashboardClusterCellName = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link to={`/cluster/${clusterUrlName}`} />
    </th>
  );
};
