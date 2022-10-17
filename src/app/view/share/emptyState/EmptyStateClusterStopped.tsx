import React from "react";

import { ClusterStoppedInfo } from "app/view/share/ClusterStoppedInfo";

import { EmptyStateConfigure } from "./EmptyStateConfigure";

export const EmptyStateClusterStopped = ({
  title,
}: {
  title: React.ReactNode;
}) => {
  return <EmptyStateConfigure title={title} message={<ClusterStoppedInfo />} />;
};
