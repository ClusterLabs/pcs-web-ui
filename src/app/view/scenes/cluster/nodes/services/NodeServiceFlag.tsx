import React from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

export const NodeServiceFlag = ({
  ok,
  okLabel,
  warningLabel,
}: {
  ok: boolean;
  okLabel: string;
  warningLabel: string;
}) => {
  return ok ? (
    <>
      <CheckCircleIcon className="ha-u-status-success" />
      {` ${okLabel}`}
    </>
  ) : (
    <>
      <ExclamationTriangleIcon className="ha-u-status-warning" />
      {` ${warningLabel}`}
    </>
  );
};
