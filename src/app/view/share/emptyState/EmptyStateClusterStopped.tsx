import React from "react";

import { ClusterStoppedInfo } from "app/view/share/ClusterStoppedInfo";

import { EmptyStateConfigure } from "./EmptyStateConfigure";

export const EmptyStateClusterStopped = ({
  title,
  clusterName,
}: {
  title: React.ReactNode;
  clusterName: string;
}) => {
  return (
    <EmptyStateConfigure
      title={title}
      message={
        <ClusterStoppedInfo startButton="button" clusterName={clusterName} />
      }
    />
  );
};
