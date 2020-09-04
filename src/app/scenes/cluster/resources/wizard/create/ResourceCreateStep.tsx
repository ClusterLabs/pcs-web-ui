import React from "react";
import { Stack, StackItem, Text, TextContent } from "@patternfly/react-core";

import { ResourceCreateReports } from "./ResourceCreateReports";

export const ResourceCreateStep: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">{title}</Text>
        </TextContent>
      </StackItem>
      <StackItem>{children}</StackItem>
      <StackItem>
        <ResourceCreateReports />
      </StackItem>
    </Stack>
  );
};
