import React from "react";
import { Button } from "@patternfly/react-core";

import { api } from "app/backend";
import { WizardFinishError, WizardLibReports } from "app/view/share";

import { useWizard } from "../useWizard";

const allErrorsCanBeForced = (reports: api.LibReport[]) =>
  reports.every(
    r => r.severity.level !== "ERROR" || r.severity.force_code !== null,
  );

export const ResourceCreateFinishFail: React.FC = () => {
  const {
    state: { resourceName, reports },
    wizard: { goToStepByName },
    close,
    create,
  } = useWizard();

  const isForcible = allErrorsCanBeForced(reports);
  return (
    <>
      <WizardFinishError
        title={`Create resource "${resourceName}" failed`}
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
          <Button
            variant="primary"
            onClick={() => goToStepByName("Name and type")}
          >
            Back to first step
          </Button>
        }
        secondaryActions={
          <>
            {isForcible && (
              <Button variant="link" onClick={() => create({ force: true })}>
                Create resource anyway (proceed with current settings)
              </Button>
            )}
            <Button variant="link" onClick={close}>
              Cancel
            </Button>
          </>
        }
      />
      <WizardLibReports reports={reports} />
    </>
  );
};
