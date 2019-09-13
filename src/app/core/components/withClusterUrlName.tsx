import React from "react";
import { match as Match } from "react-router";

export const withClusterUrlName = (
  ClusterComponent: React.ComponentType<{ clusterUrlName: string }>,
) => (
  { match }: { match: Match<{ clusterUrlName: string }> },
) => (
  <ClusterComponent clusterUrlName={match.params.clusterUrlName} />
);

export const withResourceUrlName = (
  ClusterComponent: React.ComponentType<{
    clusterUrlName: string,
    resourceUrlName: string,
  }>,
) => (
  { match }: { match: Match<{
    clusterUrlName: string,
    resourceUrlName: string,
  }> },
) => (
  <ClusterComponent
    clusterUrlName={match.params.clusterUrlName}
    resourceUrlName={match.params.resourceUrlName}
  />
);
