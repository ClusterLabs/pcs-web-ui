import React from "react";
import { mapProps } from "recompose";
import { Link } from "react-router-dom";
import { PowerOffIcon } from "@patternfly/react-icons";

const withStonithAggregations = mapProps(({ stonithList, clusterName }) => ({
  total: stonithList.length,
  stonithLink: `/cluster/${clusterName}/stonith`,
}));

const DashboardClusterStonith = ({ total, stonithLink }) => (
  <React.Fragment>
    <div>
      <Link to={stonithLink}>
        <PowerOffIcon />
        <span>&nbsp;&nbsp;</span>
        <strong>{total}</strong>
        <span> fence agents</span>
      </Link>
    </div>
  </React.Fragment>
);

export default withStonithAggregations(DashboardClusterStonith);
