import React from "react";
import { Alert, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/store";

import { TaskReport } from "./TaskReport";

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

export const TaskLibReports: React.FC<{
  reports: TaskReport[];
}> = ({ reports }) => {
  if (reports.length === 0) {
    return null;
  }
  return (
    <>
      <TextContent>
        <Text component="h3">Messages</Text>
      </TextContent>
      <>
        {reports.map((report, i) => {
          /* eslint-disable react/no-array-index-key */
          if ("severity" in report) {
            return (
              <Alert
                key={i}
                variant={severityToAlertVariant(report.severity.level)}
                isInline
                title={`${report.message.message}${
                  report.severity.force_code !== null
                    ? " (can be overridden)"
                    : ""
                }`}
              />
            );
          }

          if ("level" in report) {
            return (
              <Alert
                key={i}
                variant={severityToAlertVariant(report.level)}
                isInline
                title={report.message}
              />
            );
          }

          return null;
        })}
      </>
    </>
  );
};
