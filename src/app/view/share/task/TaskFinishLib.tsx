import React from "react";
import { Button } from "@patternfly/react-core";

import { types } from "app/store";
import * as lib from "app/view/share/lib";

import { TaskSuccess } from "./TaskSuccess";
import { TaskLibReports } from "./TaskLibReports";
import { TaskFinishErrorLib } from "./TaskFinishErrorLib";
import { TaskProgress } from "./TaskProgress";
import { TaskFinishError } from "./TaskFinishError";

type TaskSuccessProps = React.ComponentProps<typeof TaskSuccess>;

export const TaskFinishLib: React.FC<{
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error"
    | "progress";
  taskName: string;
  close: () => void;
  backToUpdateSettings: () => void;
  proceedForce: () => void;
  tryAgain: () => void;
  reports: types.LibReport[];
  successPrimaryActions?: TaskSuccessProps["primaryActions"];
  successSecondaryActions?: TaskSuccessProps["secondaryActions"];
}> = ({
  response,
  taskName,
  successSecondaryActions,
  successPrimaryActions,
  close,
  backToUpdateSettings,
  proceedForce,
  tryAgain,
  reports,
}) => {
  const isForcible = lib.reports.allErrorsCanBeForced(reports);
  switch (response) {
    case "success":
      return (
        <>
          <TaskSuccess
            title={`Task "${taskName}" has been done successfully`}
            primaryActions={successPrimaryActions}
            secondaryActions={successSecondaryActions}
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
