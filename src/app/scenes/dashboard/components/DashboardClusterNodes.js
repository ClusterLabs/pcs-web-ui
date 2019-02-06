import React from "react";
import { Link } from "react-router-dom";
import { ContainerNodeIcon } from "@patternfly/react-icons";

import DashboardClusterWarning from "./DashboardClusterWarning";

const getAggregations = (nodeList) => {
  const offline = nodeList.filter(n => n.status === "offline").length;
  return {
    total: nodeList.length,
    warningList: offline > 0
      ? [`${offline} node${offline > 1 ? "s" : ""} offline`]
      : []
    ,
  };
};

const nodesLink = clusterName => `/cluster/${clusterName}/nodes`;

const DashboardClusterNodes = ({ nodeList, clusterName }) => {
  const { total, warningList } = getAggregations(nodeList);
  return (
    <React.Fragment>
      <div data-role="nodes">
        <Link data-role="link" to={nodesLink(clusterName)}>
          <ContainerNodeIcon />
          <span>&nbsp;&nbsp;</span>
          <strong data-role="total">{total}</strong>
          <span> nodes</span>
        </Link>
      </div>
      <DashboardClusterWarning warningList={warningList} />
    </React.Fragment>
  );
};

export default DashboardClusterNodes;
