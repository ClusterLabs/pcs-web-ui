import React from "react";
import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  ClusterStatusLabel,
  location,
  useDispatch,
  useLocation,
} from "app/view/share";

const {clusterBreadcrumbs: breadcrumbs} = testMarks;

export const ClusterAppBreadcrumbs = ({
  clusterName,
  statusLabel,
}: {
  clusterName: string;
  statusLabel: React.ComponentProps<typeof ClusterStatusLabel>["status"];
}) => {
  const dispatch = useDispatch();
  const {navigate} = useLocation();
  return (
    <Breadcrumb {...breadcrumbs.mark}>
      <BreadcrumbItem
        to={location.dashboard}
        component="a"
        onClick={(e: React.SyntheticEvent) => {
          e.preventDefault();
          navigate(location.dashboard);
        }}
        {...breadcrumbs.dashboard.mark}
      >
        Clusters
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
          <strong {...breadcrumbs.clusterName.mark}>{clusterName}</strong>
        </span>
        <ClusterStatusLabel
          status={statusLabel}
          {...breadcrumbs.clusterStatus.mark}
        />
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
