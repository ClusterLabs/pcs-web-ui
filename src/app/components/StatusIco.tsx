import React from "react";
import {
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@patternfly/react-icons";

import * as pallete from "./pallete";


const StatusIco = ({ status }: {
  status: "OK"|"ERROR"|"WARNING"|"UNKNOWN",
}) => {
  switch (status) {
    case "OK": return <CheckIcon color={pallete.SUCCESS} />;
    case "ERROR": return <ExclamationCircleIcon color={pallete.ERROR} />;
    case "WARNING": return (
      <ExclamationTriangleIcon color={pallete.WARNING_LIGHT} />
    );
    default: return <QuestionCircleIcon color={pallete.UNKNOWN} />;
  }
};

type Status = React.ComponentProps<typeof StatusIco>["status"];
function itemsToSummaryStatus<T>(itemToStatus: (item: T) => Status) {
  return (itemList: T[]) => itemList.reduce<Status>(
    (sumStatus, item) => {
      const statuses = [itemToStatus(item), sumStatus];
      if (statuses.includes("ERROR")) {
        return "ERROR";
      }
      if (statuses.includes("WARNING")) {
        return "WARNING";
      }
      if (statuses.includes("UNKNOWN")) {
        return "UNKNOWN";
      }
      return "OK";
    },
    "OK",
  );
}


StatusIco.itemsToSummaryStatus = itemsToSummaryStatus;

export default StatusIco;
