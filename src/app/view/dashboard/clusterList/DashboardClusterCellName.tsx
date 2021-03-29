import React from "react";

import { Link, location } from "app/view/share";

export const DashboardClusterCellName: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link to={location.cluster({ clusterName })} />
    </th>
  );
};
