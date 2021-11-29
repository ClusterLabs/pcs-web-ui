import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import { CheckCircleIcon } from "@patternfly/react-icons";

import * as pallete from "app/view/share/pallete";

export const TaskSuccess: React.FC<{
  title: React.ReactNode;
  message?: string;
  close: () => void;
  closeLabel?: React.ReactNode;
  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}> = ({
  title,
  close,
  primaryActions = null,
  secondaryActions = null,
  message = "",
}) => {
  return (
    <EmptyState style={{ margin: "auto" }} data-test="task-success">
      <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      {message.length > 0 && <EmptyStateBody>{message}</EmptyStateBody>}
      {primaryActions === null && (
        <Button variant="primary" onClick={close} data-test="task-close">
          Close
        </Button>
      )}
      {primaryActions !== null && primaryActions}
      <EmptyStateSecondaryActions>
        {secondaryActions}
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
