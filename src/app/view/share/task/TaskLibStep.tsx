import React from "react";
import { Stack, StackItem, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/store";

import { TaskLibReports } from "./TaskLibReports";

export const TaskLibStep: React.FC<{
  title: string;
  reports?: types.LibReport[];
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
