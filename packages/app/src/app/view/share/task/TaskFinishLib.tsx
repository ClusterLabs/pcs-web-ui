import React from "react";

import {types} from "app/store";
import * as lib from "app/view/share/lib";

import {TaskLibReports} from "./TaskLibReports";
import {TaskFinishError} from "./TaskFinishError";
import {TaskResultLib} from "./TaskResultLib";

export const TaskFinishLib = ({
  response,
  taskName,
  success,
  backToUpdateSettings,
  proceedForce,
  tryAgain,
  reports,
}: {
  response: React.ComponentProps<typeof TaskResultLib>["response"];
  taskName: string;
  backToUpdateSettings: () => void;
  proceedForce?: () => void;
  tryAgain: () => void;
  reports: types.LibReport[];
  success?: React.ReactNode;
}) => {
  const isForcible = lib.reports.allErrorsCanBeForced(reports) && proceedForce;
  return (
    <TaskResultLib
      response={response}
      taskName={taskName}
      success={success}
      libraryFail={
        <TaskFinishError
          title={`Task "${taskName}" failed`}
          message={
            <>
              Operation has not completed successfully (see messages below). You
              can return back, change settings and try again. All messages below
              will stay available.
              {isForcible && (
                <>
                  {" "}
                  Or you can proceed anyway with the current settings since all
                  errors can be overridden.
                </>
              )}
            </>
          }
          primaryAction={["Back to update settings", backToUpdateSettings]}
          {...(isForcible
            ? {
                secondaryActions: {
                  "Proceed anyway with current settings": proceedForce,
                },
              }
            : {})}
        />
      }
      communicationError={
        <TaskFinishError
          title={`Communication error during task "${taskName}"`}
          message={
            <>
              A communication error occurred during the operation (details in
              the browser console). You can try to perform the operation again.
            </>
          }
          primaryAction={["Try again", tryAgain]}
        />
      }
      reports={<TaskLibReports reports={reports} />}
    />
  );
};
