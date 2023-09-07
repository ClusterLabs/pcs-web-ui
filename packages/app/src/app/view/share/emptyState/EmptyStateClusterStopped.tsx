import React from "react";

import {ClusterStoppedInfo} from "app/view/share/ClusterStoppedInfo";

import {EmptyStateConfigure} from "./EmptyStateConfigure";

export const EmptyStateClusterStopped = (props: {
  title: React.ReactNode;
  clusterName: string;
  "data-test"?: string;
}) => {
  return (
    <EmptyStateConfigure
      title={props.title}
      message={
        <ClusterStoppedInfo
          startButton="button"
          clusterName={props.clusterName}
        />
      }
      data-test={props["data-test"]}
    />
  );
};
