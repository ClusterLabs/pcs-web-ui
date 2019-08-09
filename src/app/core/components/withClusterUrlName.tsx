import React from "react";
import { match as Match } from "react-router";

const withClusterUrlName = (
  ClusterComponent: React.ComponentType<{ clusterUrlName: string }>,
) => (
  { match }: { match: Match<{ clusterUrlName: string }> },
) => (
  <ClusterComponent clusterUrlName={match.params.clusterUrlName} />
);

export default withClusterUrlName;
