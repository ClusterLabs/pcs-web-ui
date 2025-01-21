import type React from "react";
import {Text, TextContent} from "@patternfly/react-core";

import {TaskLibReport} from "./TaskLibReport";
import type {TaskReport} from "./TaskReport";

export const TaskLibReportList = (props: {
  reports: TaskReport[];
  renderReport?: (report: TaskReport, i: number) => React.ReactNode;
  "data-test"?: string;
}) => {
  if (props.reports.length === 0) {
    return null;
  }

  return (
    <div data-test={props["data-test"]}>
      <TextContent>
        <Text component="h3">Messages</Text>
      </TextContent>
      {props.reports.map(
        props.renderReport ??
          ((report, i) => <TaskLibReport key={i} report={report} />),
      )}
    </div>
  );
};
