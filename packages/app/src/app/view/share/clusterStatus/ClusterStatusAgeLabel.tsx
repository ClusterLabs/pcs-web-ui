import React from "react";
import {SyncAltIcon} from "@patternfly/react-icons";

import {useDispatch} from "app/view/share";

import {LoadingLabel} from "./LoadingLabel";

const age = (when: number) => Math.floor((Date.now() - when) / 1000);

export const ClusterStatusAgeLabel = (props: {
  clusterName: string;
  when: number;
}) => {
  const [refreshHovered, setRefreshHovered] = React.useState(false);
  const [ageSeconds, setAgeSecons] = React.useState(age(props.when));
  const dispatch = useDispatch();

  React.useEffect(() => {
    setAgeSecons(age(props.when));
    const interval = setInterval(() => setAgeSecons(age(props.when)), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [props.when]);

  return (
    <LoadingLabel
      variant={refreshHovered ? "filled" : "outline"}
      icon={<SyncAltIcon />}
      onClick={() =>
        dispatch({
          type: "CLUSTER.STATUS.REFRESH",
          key: {clusterName: props.clusterName},
        })
      }
      onMouseEnter={() => setRefreshHovered(true)}
      onMouseLeave={() => setRefreshHovered(false)}
      style={{cursor: "pointer"}}
    >
      {ageSeconds < 1 ? "now" : `${ageSeconds} s ago`}
    </LoadingLabel>
  );
};
