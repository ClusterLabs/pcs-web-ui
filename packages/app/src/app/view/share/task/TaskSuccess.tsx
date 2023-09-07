import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

import {useTaskContext} from "./TaskContext";

export const TaskSuccess = (props: {
  primaryAction: React.ReactNode;
  secondaryActions?: React.ReactNode;
  "data-test"?: string;
}) => {
  const {taskLabel} = useTaskContext();
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"] ?? "task-success"}
    >
      <EmptyStateIcon icon={CheckCircleIcon} color={palette.SUCCESS} />
      <Title headingLevel="h4" size="lg">
        {`Task "${taskLabel}" has been done successfully`}
      </Title>

      {props.primaryAction}
      <EmptyStateSecondaryActions>
        {props.secondaryActions}
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
