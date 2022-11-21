import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";

import {ClusterStatusLabel, Link, location, useDispatch} from "app/view/share";
import {useClusterStore} from "app/view/cluster/share";

export const ClusterAppBreadcrumb = ({clusterName}: {clusterName: string}) => {
  const dispatch = useDispatch();
  const {clusterInfo} = useClusterStore(clusterName);
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
            key: {clusterName},
          })
        }
      >
        <span className="pf-u-mr-sm">
          <strong>{clusterName}</strong>
        </span>
        <ClusterStatusLabel
          status={
            clusterInfo.state === "cluster-data-successfully-fetched"
              ? clusterInfo.cluster.status
              : "unknown"
          }
        />
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
