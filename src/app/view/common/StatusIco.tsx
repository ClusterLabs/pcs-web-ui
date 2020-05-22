import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  QuestionCircleIcon,
} from "@patternfly/react-icons";

import { types } from "app/store";

export const StatusIco = ({
  status,
}: {
  status: types.cluster.StatusSeverity | "UNKNOWN";
}) => {
  switch (status) {
    case "OK":
      return <CheckCircleIcon className="ha-u-status-success" />;
    case "ERROR":
      return <ExclamationCircleIcon className="ha-u-status-danger" />;
    case "WARNING":
      return <ExclamationTriangleIcon className="ha-u-status-warning" />;
    default:
      return <QuestionCircleIcon className="ha-u-status-unknown" />;
  }
};
