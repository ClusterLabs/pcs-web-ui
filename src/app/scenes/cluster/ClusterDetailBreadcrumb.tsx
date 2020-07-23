import React from "react";
import { useDispatch } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

import { Action } from "app/store";

import { Link } from "app/view";

export const ClusterDetailBreadcrumb = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  const dispatch = useDispatch();
  return (
    <Breadcrumb>
      <BreadcrumbItem component="span">
        <Link to="/">Clusters</Link>
      </BreadcrumbItem>
      <BreadcrumbItem
        isActive
        onClick={() =>
          dispatch<Action>({
            type: "CLUSTER_DATA.REFRESH",
            payload: { clusterUrlName },
          })
        }
      >
        {clusterUrlName}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
