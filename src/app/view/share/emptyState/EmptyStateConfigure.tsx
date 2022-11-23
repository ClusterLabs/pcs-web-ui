import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {WrenchIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const EmptyStateConfigure = ({
  title,
  message,
}: {
  title: React.ReactNode;
  message: React.ReactNode;
}) => {
  return (
    <EmptyState style={{margin: "auto"}}>
      <EmptyStateIcon icon={WrenchIcon} color={palette.UNKNOWN} />
      <Title size="lg" headingLevel="h3">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
    </EmptyState>
  );
};
