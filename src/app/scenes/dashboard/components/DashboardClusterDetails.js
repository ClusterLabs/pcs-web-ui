import React from "react";

import DashboardClusterDetailNodes from "./DashboardClusterDetailNodes";
import DashboardClusterDetailResources from "./DashboardClusterDetailResources";
import DashboardClusterDetailIssues from "./DashboardClusterDetailIssues";

const DashboardClusterDetails = ({ cluster }) => (
  <React.Fragment>
    <DashboardClusterDetailIssues issueList={cluster.issueList} />

    <DashboardClusterDetailNodes
      nodeList={cluster.nodeList}
    />

    <DashboardClusterDetailResources
      resourceList={cluster.resourceList}
    />

    <DashboardClusterDetailResources
      resourceList={cluster.stonithList}
      isStonith
    />

  </React.Fragment>
);

export default DashboardClusterDetails;
