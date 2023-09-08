import React from "react";
import {Label} from "@patternfly/react-core";
import {SyncAltIcon} from "@patternfly/react-icons";

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
  const [refreshHovered, setRefreshHovered] = React.useState(false);
  return (
    <>
      <Label
        color={statusColorMap[props.status]}
        isCompact
        data-test={props["data-test"]}
      >
        {props.status}
      </Label>

      <Label
        variant={refreshHovered ? "filled" : "outline"}
        color="blue"
        isCompact
        className="pf-u-ml-xs"
        icon={<SyncAltIcon />}
        onClick={() => console.log("cluster sync")}
        onMouseEnter={() => setRefreshHovered(true)}
        onMouseLeave={() => setRefreshHovered(false)}
        style={{cursor: "pointer"}}
      >
        25 s ago
      </Label>
    </>
  );
};
