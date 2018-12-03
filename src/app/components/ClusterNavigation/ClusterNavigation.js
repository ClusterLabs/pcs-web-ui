import React from "react";
import {
  Nav,
  NavList,
} from "@patternfly/react-core";

import ClusterNavigationItem from "./ClusterNavigationItem";

const ClusterNavigation = ({ clusterName }) => (
  <Nav aria-label="ClusterNavigation">
    <NavList>
      <ClusterNavigationItem
        to={`/cluster/${clusterName}`}
        label="Overview"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterName}/nodes`}
        label="Nodes"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterName}/resources`}
        label="Resources"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterName}/stonith`}
        label="Stonith"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterName}/properties`}
        label="Cluster properties"
      />
    </NavList>
  </Nav>
);

export default ClusterNavigation;
