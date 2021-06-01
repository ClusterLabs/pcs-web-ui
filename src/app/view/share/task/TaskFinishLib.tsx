import React from "react";
import { Button } from "@patternfly/react-core";

import { types } from "app/store";

import { TaskSuccess } from "./TaskSuccess";
import { TaskLibReports } from "./TaskLibReports";
import { TaskFinishErrorLib } from "./TaskFinishErrorLib";
import { TaskProgress } from "./TaskProgress";
import { TaskFinishError } from "./TaskFinishError";

const allErrorsCanBeForced = (reports: types.LibReport[]) =>
  reports.every(
    r => r.severity.level !== "ERROR" || r.severity.force_code !== null,
  );

export const TaskFinishLib: React.FC<{
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
  taskName: string;
  close: () => void;
  backToUpdateSettings: () => void;
  proceedForce: () => void;
  tryAgain: () => void;
  reports: types.LibReport[];
}> = ({
  response,
  taskName,
  close,
  backToUpdateSettings,
  proceedForce,
  tryAgain,
  reports,
}) => {
  const isForcible = allErrorsCanBeForced(reports);
  switch (response) {
    case "success":
      return (
        <>
          <TaskSuccess
            title={`Task "${taskName}" has been done successfully`}
            close={close}
          />
          <TaskLibReports reports={reports} />
        </>
      );
    case "fail":
      return (
        <>
          <TaskFinishError
            title={`Task "${taskName}" failed`}
            message={
              <>
                Operation has not completed sucessfully (see messages below).
                You can return back, change settings and try again. All messages
                below will stay available.
                {isForcible && (
                  <>
                    {" "}
                    Or you can proceed anyway with the current settings since
                    all errors can be overriden.
                  </>
                )}
              </>
            }
            primaryActions={
              <Button variant="primary" onClick={backToUpdateSettings}>
                Back to update settings
              </Button>
            }
            secondaryActions={
              <>
                {isForcible && (
                  <Button variant="link" onClick={proceedForce}>
                    Proceed anyway with current settings
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
    case "communication-error":
      return (
        <TaskFinishErrorLib
          title={`Communication error during task "${taskName}"`}
          tryAgain={tryAgain}
          close={close}
        />
      );
    default:
      return <TaskProgress title={`Processing task "${taskName}".`} />;
  }
};
