import React from "react";
import { Nav, NavList } from "@patternfly/react-core";

import ClusterNavigationItem from "./ClusterNavigationItem";

const ClusterNavigation = ({ clusterUrlName }: { clusterUrlName: string }) => (
  <Nav aria-label="ClusterNavigation">
    <NavList>
      <ClusterNavigationItem
        to={`/cluster/${clusterUrlName}`}
        label="Overview"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterUrlName}/nodes`}
        label="Nodes"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterUrlName}/resources`}
        label="Resources"
      />
      <ClusterNavigationItem
        to={`/cluster/${clusterUrlName}/stonith`}
        label="Stonith"
      />
    </NavList>
  </Nav>
);

export default ClusterNavigation;
