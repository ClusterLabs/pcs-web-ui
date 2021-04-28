import React from "react";
import { Button } from "@patternfly/react-core";

import { types } from "app/store";
import { TaskFinishError, TaskLibReports } from "app/view/share";

import { useTask } from "./useTask";
const allErrorsCanBeForced = (reports: types.LibReport[]) =>
  reports.every(
    r => r.severity.level !== "ERROR" || r.severity.force_code !== null,
  );

export const Fail: React.FC = () => {
  const {
    state: { reports },
    wizard: { goToStepByName },
    close,
    create,
  } = useTask();

  const isForcible = allErrorsCanBeForced(reports);
  return (
    <>
      <TaskFinishError
        title={"Create constraint order with resource sets failed"}
        message={
          <>
            Operation has not completed sucessfully (see messages below). You
            can return back, change settings and try again. All messages below
            will stay available.
            {isForcible && (
              <>
                {" "}
                Or you can continue with the current settings since all errors
                can be overriden.
              </>
            )}
          </>
        }
        primaryActions={
          <Button variant="primary" onClick={() => goToStepByName("Options")}>
            Back to first step
          </Button>
        }
        secondaryActions={
          <>
            {isForcible && (
              <Button variant="link" onClick={() => create({ force: true })}>
                Create order constraint anyway (proceed with current settings)
              </Button>
            )}
            <Button variant="link" onClick={close}>
              Cancel
            </Button>
          </>
        }
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
