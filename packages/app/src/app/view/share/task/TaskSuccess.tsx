import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const TaskSuccess = (props: {
  taskName: string;
  primaryAction: React.ReactNode;
  secondaryActions?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"] ?? "task-success"}
    >
      <EmptyStateIcon icon={CheckCircleIcon} color={palette.SUCCESS} />
      <Title headingLevel="h4" size="lg">
        {`Task "${props.taskName}" has been done successfully`}
      </Title>

      {props.primaryAction}
      <EmptyStateSecondaryActions>
        {props.secondaryActions}
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
