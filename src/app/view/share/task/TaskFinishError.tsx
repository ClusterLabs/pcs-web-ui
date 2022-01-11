import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons/dist/js/icons";

import * as pallete from "app/view/share/pallete";

export const TaskFinishError: React.FC<{
  title: React.ReactNode;
  message: React.ReactNode;
  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}> = ({
  title,
  message,
  primaryActions = undefined,
  secondaryActions = undefined,
}) => {
  return (
    <EmptyState data-test="task-error">
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
      {primaryActions}
      <EmptyStateSecondaryActions>
        {secondaryActions}
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
