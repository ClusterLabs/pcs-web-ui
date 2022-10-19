import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

import { Link, location, useDispatch } from "app/view/share";
import { ClusterStatusLabel, useClusterState } from "app/view/share";

export const ClusterDetailBreadcrumb = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  const dispatch = useDispatch();
  const { clusterState, dataLoaded } = useClusterState(clusterName);
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
        <span className="pf-u-mr-sm">{clusterName}</span>
        <ClusterStatusLabel
          status={dataLoaded ? clusterState.status : "unknown"}
        />
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
