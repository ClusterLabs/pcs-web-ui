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

export default StatusIco;
