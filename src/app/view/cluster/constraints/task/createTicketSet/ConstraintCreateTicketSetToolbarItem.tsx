import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { ResourceSetList } from "./ResourceSetList";
import { Review } from "./Review";

export const ConstraintCreateTicketSetToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    isOpened,
    areSetsValid,
    isTicketValid,
    isCustomIdValid,
    create,
    state: {
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-ticket-create"
      >
        Create Ticket Set
      </Button>
      {isOpened && (
        <Wizard
          task="constraintTicketSetCreate"
          data-test="task-constraint-ticket-set-create"
          title="New ticket set constraint"
          description="Create ticket set constraint"
          onClose={close}
          steps={[
            {
              name: "Resource Sets",
              component: <ResourceSetList />,
              footer: (
                <WizardFooter next={{ actionIf: areSetsValid }} backDisabled />
              ),
            },
            {
              name: "Options",
              canJumpTo: areSetsValid,
              component: <Options />,
              footer: (
                <WizardFooter
                  next={{
                    actionIf: isCustomIdValid && isTicketValid,
                  }}
                />
              ),
            },
            {
              name: "Review",
              canJumpTo: areSetsValid && isCustomIdValid && isTicketValid,
              component: <Review />,
              footer: (
                <WizardFooter
                  next={{
                    preAction: () => create({ force: false }),
                    label: "Create ticket constraint",
                  }}
                />
              ),
            },
            {
              name: "Result",
              component: (
                <TaskFinishLibWizard
                  response={response}
                  taskName="create ticket constraint with resource set"
                  close={close}
                  backToUpdateSettingsStepName="Resource Sets"
                  proceedForce={() => create({ force: true })}
                  reports={reports}
                />
              ),
              isFinishedStep: true,
            },
          ]}
        />
      )}
    </>
  );
};
