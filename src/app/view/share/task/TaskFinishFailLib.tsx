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
import { types } from "app/store";

import { TaskLibReports } from "./TaskLibReports";

const allErrorsCanBeForced = (reports: types.LibReport[]) =>
  reports.every(
    r => r.severity.level !== "ERROR" || r.severity.force_code !== null,
  );

export const TaskFinishFailLib: React.FC<{
  title: React.ReactNode;
  reports: React.ComponentProps<typeof TaskLibReports>["reports"];
  createForce: () => void;
  createForceLabel: React.ReactNode;
  close: () => void;
  toFirstStep: () => void;
}> = ({
  title,
  reports,
  close,
  createForce,
  toFirstStep,
  createForceLabel,
}) => {
  const isForcible = allErrorsCanBeForced(reports);
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
        <Title headingLevel="h4" size="lg">
          {title}
        </Title>
        <EmptyStateBody>
          Operation has not completed sucessfully (see messages below). You can
          return back, change settings and try again. All messages below will
          stay available.
          {isForcible && (
            <>
              {" "}
              Or you can continue with the current settings since all errors can
              be overriden.
            </>
          )}
        </EmptyStateBody>
        <Button variant="primary" onClick={toFirstStep}>
          Back to first step
        </Button>
        <EmptyStateSecondaryActions>
          {isForcible && (
            <Button variant="link" onClick={createForce}>
              {createForceLabel}
            </Button>
          )}
          <Button variant="link" onClick={close}>
            Cancel
          </Button>
        </EmptyStateSecondaryActions>
      </EmptyState>
      <TaskLibReports reports={reports} />
    </>
  );
};
