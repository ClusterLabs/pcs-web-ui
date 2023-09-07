import React from "react";
import {Label} from "@patternfly/react-core";

import {Cluster} from "app/view/cluster/types";

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
  status: Cluster["status"];
  "data-test": string;
}) => {
  return (
    <Label
      color={statusColorMap[props.status]}
      isCompact
      data-test={props["data-test"]}
    >
      {props.status}
    </Label>
  );
};
