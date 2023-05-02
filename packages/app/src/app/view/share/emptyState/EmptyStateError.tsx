import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const EmptyStateError = ({
  title,
  message,
}: {
  title: string;
  message: React.ReactNode;
}) => {
  return (
    <EmptyState style={{margin: "auto"}}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={palette.ERROR} />
      <Title size="lg" headingLevel="h3">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
    </EmptyState>
  );
};
