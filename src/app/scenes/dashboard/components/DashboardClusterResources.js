import React from "react";
import { Link } from "react-router-dom";
import { CogIcon } from "@patternfly/react-icons";

import DashboardClusterWarning from "./DashboardClusterWarning";

const getAggregations = (resourceList) => {
  const blocked = resourceList.filter(r => r.status === "blocked").length;
  return {
    total: resourceList.length,
    warningList: blocked > 0
      ? [`${blocked} resource${blocked > 1 ? "s" : ""} blocked`]
      : []
    ,
  };
};

const resourcesLink = clusterName => `/cluster/${clusterName}/resources`;

const DashboardClusterResources = ({ resourceList, clusterName }) => {
  const { total, warningList } = getAggregations(resourceList);
  return (
    <React.Fragment>
      <div data-role="resources">
        <Link data-role="link" to={resourcesLink(clusterName)}>
          <CogIcon />
          <span>&nbsp;&nbsp;</span>
          <strong data-role="total">{total}</strong>
          <span> resources</span>
        </Link>
      </div>
      <DashboardClusterWarning warningList={warningList} />
    </React.Fragment>
  );
};

export default DashboardClusterResources;
