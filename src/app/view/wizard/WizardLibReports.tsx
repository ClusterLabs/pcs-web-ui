import React from "react";
import { Alert, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/backend";

const severityToAlertVariant = (
  severity: types.libraryResponse.ApiReport["severity"],
): React.ComponentProps<typeof Alert>["variant"] => {
  switch (severity) {
    case "ERROR":
      return "danger";
    case "WARNING":
      return "warning";
    default:
      return "info";
  }
};

export const WizardLibReports: React.FC<{
  reports: types.libraryResponse.ApiReport[];
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
        {reports.map((report, i) => (
          /* eslint-disable react/no-array-index-key */
          <Alert
            key={i}
            variant={severityToAlertVariant(report.severity)}
            isInline
            title={report.report_text}
          />
        ))}
      </>
    </>
  );
};
