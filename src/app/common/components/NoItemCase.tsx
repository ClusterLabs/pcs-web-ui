import React from "react";
import { Stack, StackItem, Alert } from "@patternfly/react-core";

const NoItemCase = ({ message, margin = true }: {
  message: string;
  margin?: boolean;
}) => (
  <Stack gutter="sm" style={{ margin: margin ? "1rem" : "none" }}>
    <StackItem isFilled>
      <Alert
        isInline
        variant="info"
        title={message}
      />
    </StackItem>
  </Stack>
);

export default NoItemCase;
