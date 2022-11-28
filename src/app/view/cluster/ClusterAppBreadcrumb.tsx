import React from "react";
import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";

import {ClusterStatusLabel, Link, location, useDispatch} from "app/view/share";

export const ClusterAppBreadcrumb = ({
  clusterName,
  statusLabel,
}: {
  clusterName: string;
  statusLabel: React.ComponentProps<typeof ClusterStatusLabel>["status"];
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
            key: {clusterName},
          })
        }
      >
        <span className="pf-u-mr-sm">
          <strong>{clusterName}</strong>
        </span>
        <ClusterStatusLabel status={statusLabel} />
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
