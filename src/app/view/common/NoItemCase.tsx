import React from "react";
import { Stack, StackItem, Alert } from "@patternfly/react-core";

export const NoItemCase = ({ message, margin = true, role = "" }: {
  message: string;
  margin?: boolean;
  role?: string;
}) => (
  <Stack
    gutter="sm"
    style={{ margin: margin ? "1rem" : "none" }}
    data-role={role}
  >
    <StackItem isFilled>
      <Alert
        isInline
        variant="info"
        title={message}
      />
    </StackItem>
  </Stack>
);
