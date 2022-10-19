import { ClusterStatusLabel, Link, location } from "app/view/share";
import { Cluster } from "app/view/cluster/types";

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
        <strong>{`${clusterName} `}</strong>{" "}
        <ClusterStatusLabel status={status} />
      </Link>
    </th>
  );
};
