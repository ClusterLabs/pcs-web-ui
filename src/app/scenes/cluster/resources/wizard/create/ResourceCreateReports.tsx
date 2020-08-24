import React from "react";
import { Alert, Text, TextContent } from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { useClusterSelector } from "app/view";

const severityToAlertVariant = (
  severity: types.wizardResourceCreate.Report["severity"],
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

export const ResourceCreateReports = () => {
  const [{ reports }] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  if (reports.length === 0) {
    return null;
  }
  return (
    <>
      <TextContent>
        <Text component="h4">Reports</Text>
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
