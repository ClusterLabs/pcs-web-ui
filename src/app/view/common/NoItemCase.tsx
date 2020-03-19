import React from "react";
import { Stack, StackItem, Alert } from "@patternfly/react-core";

export const NoItemCase = ({ message, margin = true, ...rest }: {
  message: string;
  margin?: boolean;
}) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <Stack
    gutter="sm"
    style={{ margin: margin ? "1rem" : "none" }}
    {...rest}
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
