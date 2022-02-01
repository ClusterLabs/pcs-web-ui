import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons/dist/js/icons";

import * as pallete from "app/view/share/pallete";
import { ButtonWithEnter } from "app/view/share/ButtonWithEnter";

import { useTaskContext } from "./TaskContext";

export const TaskFinishError = ({
  title,
  message,
  primaryAction,
  secondaryActions = undefined,
}: {
  title: React.ReactNode;
  message: React.ReactNode;
  primaryAction: [React.ReactNode, () => void];
  secondaryActions?: Record<string, () => void>;
}) => {
  const { close } = useTaskContext();
  return (
    <EmptyState data-test="task-error">
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
      <ButtonWithEnter
        variant="primary"
        onClick={primaryAction[1]}
        data-test="task-close"
      >
        {primaryAction[0]}
      </ButtonWithEnter>
      <EmptyStateSecondaryActions>
        {secondaryActions
          && Object.entries(secondaryActions).map(([label, action]) => (
            <Button key={label} variant="link" onClick={action}>
              {label}
            </Button>
          ))}
        <Button variant="link" onClick={close}>
          Cancel
        </Button>
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
