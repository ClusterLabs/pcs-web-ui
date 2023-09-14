import React from "react";
import {Label, Popover} from "@patternfly/react-core";

import {Cluster} from "app/view/cluster/types";

const statusMap: Record<
  Cluster["status"],
  {
    color: React.ComponentProps<typeof Label>["color"];
    description: string;
  }
> = {
  running: {
    color: "green",
    description: "all nodes are online and some nodes has quorum",
  },
  degraded: {
    color: "gold",
    description: "some (not all) nodes are online and some nodes has quorum",
  },
  inoperative: {
    color: "orange",
    description:
      "not considered running or degraded but some nodes are online or standby",
  },
  offline: {color: "red", description: "all nodes are offline"},
  unknown: {
    color: "grey",
    description: "some nodes are unknown, the rest is offline",
  },
};

export const ClusterStatusLabel = (props: {
  status: Cluster["status"];
  "data-test": string;
}) => {
  return (
    <Popover
      headerContent={"Cluster status summary (meaning)"}
      bodyContent={
        <>
          {Object.entries(statusMap).map(([status, {color, description}]) => (
            <div key={status}>
              <Label color={color} isCompact>
                {status}
              </Label>
              {` ${description}`}
            </div>
          ))}
        </>
      }
    >
      <Label
        color={statusMap[props.status].color}
        isCompact
        data-test={props["data-test"]}
      >
        {props.status}
      </Label>
    </Popover>
  );
};
