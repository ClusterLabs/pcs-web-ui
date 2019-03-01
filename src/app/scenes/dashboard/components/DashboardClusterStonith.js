import React from "react";
import { Link } from "react-router-dom";
import { PowerOffIcon } from "@patternfly/react-icons";

const DashboardClusterStonith = ({ stonithList, clusterName }) => (
  <React.Fragment>
    <div>
      <Link to={`/cluster/${clusterName}/stonith`}>
        <PowerOffIcon />
        <span>&nbsp;&nbsp;</span>
        <strong>{stonithList.length}</strong>
        <span> fence agents</span>
      </Link>
    </div>
  </React.Fragment>
);

export default DashboardClusterStonith;
