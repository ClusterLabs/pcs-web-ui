import type React from "react";
import {Alert} from "@patternfly/react-core";

import type {types} from "app/store";

import type {TaskReport} from "./TaskReport";

const severityToAlertVariant = (
  level: types.LibReport["severity"]["level"],
): React.ComponentProps<typeof Alert>["variant"] => {
  switch (level) {
    case "ERROR":
      return "danger";

    case "WARNING":
      return "warning";

    default:
      return "info";
  }
};

export const TaskLibReport = (props: {
  report: TaskReport;
  "data-test"?: string;
}) => {
  const {report} = props;
  return (
    <Alert
      variant={severityToAlertVariant(
        "severity" in report ? report.severity.level : report.level,
      )}
      isInline
      title={
        "severity" in report
          ? `${report.message.message}${
              report.severity.force_code !== null ? " (can be overridden)" : ""
            }`
          : report.message
      }
      data-test={props["data-test"]}
    />
  );
};
