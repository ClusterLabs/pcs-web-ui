import React from "react";
import {Label} from "@patternfly/react-core";

import {Cluster} from "app/view/cluster/types";

import {ClusterStatusLoadingLabel} from "./ClusterStatusLoadingLabel";

const statusColorMap: Record<
  Cluster["status"],
  React.ComponentProps<typeof Label>["color"]
> = {
  running: "green",
  degraded: "gold",
  inoperative: "orange",
  offline: "red",
  unknown: "grey",
};

export const ClusterStatusLabel = (props: {
  clusterName: string;
  status: Cluster["status"];
  when: number;
  isLoading: boolean;
  "data-test": string;
}) => {
  return (
    <>
      <Label
        color={statusColorMap[props.status]}
        isCompact
        data-test={props["data-test"]}
      >
        {props.status}
      </Label>

      <ClusterStatusLoadingLabel
        clusterName={props.clusterName}
        when={props.when}
        isLoading={props.isLoading}
      />
    </>
  );
};
