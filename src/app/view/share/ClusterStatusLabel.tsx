import React from "react";
import { Label } from "@patternfly/react-core";

import { Cluster } from "app/view/cluster/types";

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

export const ClusterStatusLabel = ({
  status,
}: {
  status: Cluster["status"];
}) => {
  return (
    <Label color={statusColorMap[status]} isCompact>
      {status}
    </Label>
  );
};
