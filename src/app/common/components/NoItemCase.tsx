import React from "react";
import { Stack, StackItem, Alert } from "@patternfly/react-core";

const NoItemCase = ({ message }: { message: string }) => (
  <Stack gutter="sm" style={{ margin: "1rem" }}>
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
