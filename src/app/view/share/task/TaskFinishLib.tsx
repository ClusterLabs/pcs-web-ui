import React from "react";

import {types} from "app/store";
import * as lib from "app/view/share/lib";

import {TaskSuccess} from "./TaskSuccess";
import {TaskLibReports} from "./TaskLibReports";
import {TaskProgress} from "./TaskProgress";
import {TaskFinishError} from "./TaskFinishError";

type TaskSuccessProps = React.ComponentProps<typeof TaskSuccess>;

export const TaskFinishLib = ({
  response,
  taskName,
  success,
  backToUpdateSettings,
  proceedForce,
  tryAgain,
  reports,
}: {
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error"
    | "progress";
  taskName: string;
  backToUpdateSettings: () => void;
  proceedForce?: () => void;
  tryAgain: () => void;
  reports: types.LibReport[];
  success?: {
    primaryAction?: TaskSuccessProps["primaryAction"];
    secondaryActions?: TaskSuccessProps["secondaryActions"];
  };
}) => {
  const isForcible = lib.reports.allErrorsCanBeForced(reports) && proceedForce;
  switch (response) {
    case "success":
      return (
        <>
          <TaskSuccess
            title={`Task "${taskName}" has been done successfully`}
            primaryAction={success?.primaryAction}
            secondaryActions={success?.secondaryActions}
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
                Operation has not completed successfully (see messages below).
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
            primaryAction={["Back to update settings", backToUpdateSettings]}
            {...(isForcible
              ? {
                  secondaryActions: {
                    "Proceed anyway with current settings": proceedForce,
                  },
                }
              : {})}
          />
          <TaskLibReports reports={reports} />
        </>
      );

    case "communication-error":
      return (
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
      );

    default:
      return <TaskProgress title={`Processing task "${taskName}".`} />;
  }
};
