import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

import * as pallete from "app/view/share/pallete";
import {ButtonWithEnter} from "app/view/share/ButtonWithEnter";

import {useTaskContext} from "./TaskContext";

export const TaskSuccess = ({
  title,
  primaryAction,
  secondaryActions,
  message = "",
}: {
  title: React.ReactNode;
  message?: string;
  closeLabel?: React.ReactNode;
  primaryAction?: [React.ReactNode, () => void];
  secondaryActions?: Record<string, () => void>;
}) => {
  const {close} = useTaskContext();
  const primary: {label: React.ReactNode; action: () => void} = {
    label: "Close",
    action: close,
  };

  if (primaryAction) {
    [primary.label, primary.action] = primaryAction;
  }

  return (
    <EmptyState style={{margin: "auto"}} data-test="task-success">
      <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      {message.length > 0 && <EmptyStateBody>{message}</EmptyStateBody>}

      <ButtonWithEnter
        variant="primary"
        onClick={primary.action}
        data-test="task-close"
      >
        {primary.label}
      </ButtonWithEnter>
      <EmptyStateSecondaryActions>
        {secondaryActions
          && Object.entries(secondaryActions).map(([label, action]) => (
            <Button
              key={label}
              variant="link"
              onClick={action}
              data-test={`secondary-action ${label
                .toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              {label}
            </Button>
          ))}
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
