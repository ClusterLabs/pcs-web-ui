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

const age = (when: number) => Math.floor((Date.now() - when) / 1000);

export const ClusterStatusLabel = (props: {
  status: Cluster["status"];
  when: number;
  isLoading: boolean;
  "data-test": string;
}) => {
  const [refreshHovered, setRefreshHovered] = React.useState(false);
  const [ageSeconds, setAgeSecons] = React.useState(age(props.when));

  React.useEffect(() => {
    setAgeSecons(age(props.when));
    const interval = setInterval(() => setAgeSecons(age(props.when)), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [props.when]);

  let loadingLabel = `${ageSeconds} s ago`;
  if (props.isLoading) {
    loadingLabel = "loading";
  } else if (ageSeconds < 1) {
    loadingLabel = "now";
  }

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
        {loadingLabel}
      </Label>
    </>
  );
};
