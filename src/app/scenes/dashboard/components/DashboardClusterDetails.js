import React from "react";

import DashboardClusterDetailNodes from "./DashboardClusterDetailNodes";
import DashboardClusterDetailResources from "./DashboardClusterDetailResources";
import DashboardClusterDetailIssues from "./DashboardClusterDetailIssues";

const DashboardClusterDetails = ({ cluster }) => (
  <React.Fragment>
    <DashboardClusterDetailIssues warningList={cluster.warningList} />

    <DashboardClusterDetailNodes
      nodeList={cluster.nodeList}
    />

    <DashboardClusterDetailResources
      resourceList={cluster.resourceList}
    />


  </React.Fragment>
);

export default DashboardClusterDetails;
