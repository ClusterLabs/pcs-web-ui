import React from "react";
import { Stack, StackItem, Text, TextContent } from "@patternfly/react-core";

import { TaskLibReports } from "./TaskLibReports";

export const TaskLibStep: React.FC<{
  title: string;
  reports?: React.ComponentProps<typeof TaskLibReports>["reports"];
}> = ({ title, children, reports = [] }) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">{title}</Text>
        </TextContent>
      </StackItem>
      <StackItem>{children}</StackItem>
      <StackItem>
        <TaskLibReports reports={reports} />
      </StackItem>
    </Stack>
  );
};
