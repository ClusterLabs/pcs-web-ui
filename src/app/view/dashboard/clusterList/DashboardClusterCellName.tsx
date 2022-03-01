import { Link, location } from "app/view/share";

export const DashboardClusterCellName = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link to={location.cluster({ clusterName })}>
        <strong>{clusterName}</strong>
      </Link>
    </th>
  );
};
