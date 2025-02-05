import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  QuestionCircleIcon,
} from "@patternfly/react-icons";

import type {StatusSeverity} from "app/view/cluster/types";

export const StatusIco = ({status}: {status: StatusSeverity | "UNKNOWN"}) => {
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
