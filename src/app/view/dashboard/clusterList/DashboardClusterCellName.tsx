import { Link, location } from "app/view/share";

export const DashboardClusterCellName = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  return (
    <th role="rowheader" data-test="name">
      <Link strong to={location.cluster({ clusterName })}>
        {clusterName}
      </Link>
    </th>
  );
};
