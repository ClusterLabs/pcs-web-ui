import React from "react";
import {
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@patternfly/react-icons";

import * as pallete from "./pallete";

enum STATUS_MAP {
  OK = "ok",
  ERROR = "error",
  WARNING = "warning",
  UNKNOWN = "unknown",
}

function itemsToSummaryStatus<T>(itemToStatusIco: (item: T) => STATUS_MAP) {
  return (itemList: T[]) => itemList.reduce(
    (sumStatus, item) => {
      const statuses = [itemToStatusIco(item), sumStatus];
      if (statuses.includes(STATUS_MAP.ERROR)) {
        return STATUS_MAP.ERROR;
      }
      if (statuses.includes(STATUS_MAP.WARNING)) {
        return STATUS_MAP.WARNING;
      }
      if (statuses.includes(STATUS_MAP.UNKNOWN)) {
        return STATUS_MAP.UNKNOWN;
      }
      return STATUS_MAP.OK;
    },
    STATUS_MAP.OK,
  );
}

const StatusIco = ({ status }: { status: any }) => {
  switch (status) {
    case STATUS_MAP.OK: return <CheckIcon color={pallete.SUCCESS} />;
    case STATUS_MAP.ERROR: return (
      <ExclamationCircleIcon color={pallete.ERROR} />
    );
    case STATUS_MAP.WARNING: return (
      <ExclamationTriangleIcon color={pallete.WARNING_LIGHT} />
    );
    default: return <QuestionCircleIcon color={pallete.UNKNOWN} />;
  }
};

StatusIco.STATUS_MAP = STATUS_MAP;
StatusIco.itemsToSummaryStatus = itemsToSummaryStatus;

export default StatusIco;
