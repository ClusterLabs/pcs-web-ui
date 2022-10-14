import { Link, location } from "app/view/share";
import { Cluster } from "app/view/cluster/types";

import { ClusterStatus } from "./ClusterStatus";

export const DashboardClusterCellName = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status: Cluster["status"];
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link to={location.cluster({ clusterName })}>
        <strong>{`${clusterName} `}</strong> <ClusterStatus status={status} />
      </Link>
    </th>
  );
};
