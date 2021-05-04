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

import { TaskLibReports } from "./TaskLibReports";

export const TaskSuccessLib: React.FC<{
  title: string;
  message?: string;
  close: () => void;
  reports: React.ComponentProps<typeof TaskLibReports>["reports"];
  closeLabel?: React.ReactNode;
  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}> = ({
  title,
  close,
  reports,
  primaryActions = null,
  secondaryActions = null,
  message = "",
  closeLabel = "Close",
}) => {
  return (
    <>
      <EmptyState style={{ margin: "auto" }} data-test="task-success">
        <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
        <Title headingLevel="h4" size="lg">
          {title}
        </Title>
        {message.length > 0 && <EmptyStateBody>{message}</EmptyStateBody>}
        <>
          <Button variant="primary" onClick={close}>
            {closeLabel}
          </Button>
          {primaryActions}
        </>
        <EmptyStateSecondaryActions>
          {secondaryActions}
        </EmptyStateSecondaryActions>
      </EmptyState>
      <TaskLibReports reports={reports} />
    </>
  );
};
