import type React from "react";
import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {location, useLocation} from "app/view/share";

const {clusterBreadcrumbs: breadcrumbs} = testMarks;

export const ClusterAppBreadcrumbs = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status: React.ReactNode;
}) => {
  const {navigate, resolveLocation} = useLocation();
  return (
    <Breadcrumb {...breadcrumbs.mark} className="pf-v5-u-pb-xs">
      <BreadcrumbItem
        to={resolveLocation(location.dashboard)}
        component="a"
        onClick={e => {
          if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            navigate(location.dashboard);
          }
        }}
        {...breadcrumbs.dashboard.mark}
      >
        Clusters
      </BreadcrumbItem>
      <BreadcrumbItem isActive>
        <span className="pf-v5-u-mr-sm">
          <strong {...breadcrumbs.clusterName.mark}>{clusterName}</strong>
        </span>
        {status}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
