import React from "react";
import {SyncAltIcon} from "@patternfly/react-icons";

import {LoadingLabel} from "./LoadingLabel";

const age = (when: number) => Math.floor((Date.now() - when) / 1000);

const timeUnits = {
  minute: 60,
  hour: 60 * 60,
  day: 24 * 60 * 60,
};

const ageUnitLabel = (ageSeconds: number, unit: keyof typeof timeUnits) => {
  const groups = Math.floor(ageSeconds / timeUnits[unit]);
  return `${groups} ${unit}${groups > 1 ? "s" : ""} ago`;
};

const ageLabel = (ageSeconds: number) => {
  if (ageSeconds < 5) {
    return "just now";
  }
  if (ageSeconds < timeUnits.minute) {
    return `${5 * Math.floor(ageSeconds / 5)}s ago`;
  }
  if (ageSeconds < timeUnits.hour) {
    return ageUnitLabel(ageSeconds, "minute");
  }

  if (ageSeconds < timeUnits.day) {
    return ageUnitLabel(ageSeconds, "hour");
  }
  return ageUnitLabel(ageSeconds, "day");
};

export const LoadingDataAgeLabel = (props: {
  onClick: () => void;
  when: number;
}) => {
  const [refreshHovered, setRefreshHovered] = React.useState(false);
  const [ageSeconds, setAgeSecons] = React.useState(age(props.when));

  React.useEffect(() => {
    setAgeSecons(age(props.when));
    const interval = setInterval(() => setAgeSecons(age(props.when)), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [props.when]);

  return (
    <LoadingLabel
      variant={refreshHovered ? "filled" : "outline"}
      icon={<SyncAltIcon />}
      onClick={props.onClick}
      onMouseEnter={() => setRefreshHovered(true)}
      onMouseLeave={() => setRefreshHovered(false)}
      style={{cursor: "pointer"}}
    >
      {`updated ${ageLabel(ageSeconds)}`}
    </LoadingLabel>
  );
};
