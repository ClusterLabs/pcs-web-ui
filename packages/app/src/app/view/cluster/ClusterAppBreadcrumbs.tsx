import type React from "react";
import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

const {clusterBreadcrumbs: breadcrumbs} = testMarks;

export const ClusterAppBreadcrumbs = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status: React.ReactNode;
}) => {
  return (
    <Breadcrumb {...breadcrumbs.mark} className="pf-v6-u-pb-xs">
      <BreadcrumbItem isActive>
        <span className="pf-v6-u-mr-sm">
          <strong {...breadcrumbs.clusterName.mark}>{clusterName}</strong>
        </span>
        {status}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
