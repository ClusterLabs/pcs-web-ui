import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

import { Link, location, useDispatch } from "app/view/share";

export const ClusterDetailBreadcrumb = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  const dispatch = useDispatch();
  return (
    <Breadcrumb data-test="breadcrumb">
      <BreadcrumbItem component="span" data-test="dashboard">
        <Link to={location.dashboard}>Clusters</Link>
      </BreadcrumbItem>
      <BreadcrumbItem
        isActive
        onClick={() =>
          dispatch({
            type: "CLUSTER.STATUS.REFRESH",
            key: { clusterName },
          })
        }
      >
        {clusterName}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
