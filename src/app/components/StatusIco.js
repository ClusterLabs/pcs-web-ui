import React from "react";
import {
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@patternfly/react-icons";

import * as pallete from "./pallete";

const STATUS_MAP = {
  OK: "ok",
  ERROR: "error",
  WARNING: "warning",
  UNKNOWN: "unknown",
};

const itemsToSummaryStatus = itemToStatusIco => itemList => itemList.reduce(
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

const STATUS_ICO_MAP = {
  [STATUS_MAP.OK]: [CheckIcon, pallete.SUCCESS],
  [STATUS_MAP.ERROR]: [ExclamationCircleIcon, pallete.ERROR],
  [STATUS_MAP.WARNING]: [ExclamationTriangleIcon, pallete.WARNING_LIGHT],
  [STATUS_MAP.UNKNOWN]: [QuestionCircleIcon, pallete.UNKNOWN],
};

const StatusIco = ({ status }) => {
  const [Ico, color] = STATUS_ICO_MAP[
    STATUS_ICO_MAP[status] !== undefined
      ? status
      : STATUS_MAP.UNKNOWN
  ];
  return <Ico color={color} />;
};

StatusIco.STATUS_MAP = STATUS_MAP;
StatusIco.itemsToSummaryStatus = itemsToSummaryStatus;

export default StatusIco;
