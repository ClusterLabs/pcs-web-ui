import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { CheckCircleIcon } from "@patternfly/react-icons";

import * as pallete from "app/view/pallete";

export const WizardSuccess: React.FC<{
  title: string;
  message?: string;
}> = ({ title, children, message = "" }) => {
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      {message.length > 0 && <EmptyStateBody>{message}</EmptyStateBody>}
      <>{children}</>
    </EmptyState>
  );
};
