import React from "react";
import { Link } from "react-router-dom";
import { CogIcon } from "@patternfly/react-icons";

import { RESOURCE } from "app/services/cluster/status-constants";

import DashboardClusterWarning from "./DashboardClusterWarning";

const getAggregations = (resourceList) => {
  const warningList = [];

  const blocked = resourceList.filter(
    r => r.status === RESOURCE.STATUS.BLOCKED,
  ).length;

  if (blocked > 0) {
    warningList.push(`${blocked} resource${blocked > 1 ? "s" : ""} blocked`);
  }

  return {
    total: resourceList.length,
    warningList,
  };
};

const resourcesLink = clusterUrlName => `/cluster/${clusterUrlName}/resources`;

const DashboardClusterResources = ({ resourceList, clusterUrlName }) => {
  const { total, warningList } = getAggregations(resourceList);
  return (
    <React.Fragment>
      <div data-role="resources">
        <Link data-role="link" to={resourcesLink(clusterUrlName)}>
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
