import React from "react";
import {Stack, StackItem, Text, TextContent} from "@patternfly/react-core";

import {TaskLibReportList} from "./TaskLibReportList";

export const TaskLibStep = (props: {
  title: string;
  reports?: React.ComponentProps<typeof TaskLibReportList>["reports"];
  children?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <Stack hasGutter data-test={props["data-test"]}>
      <StackItem>
        <TextContent>
          <Text component="h2">{props.title}</Text>
        </TextContent>
      </StackItem>
      <StackItem>{props.children}</StackItem>
      <StackItem>
        <TaskLibReportList reports={props.reports ?? []} />
      </StackItem>
    </Stack>
  );
};
