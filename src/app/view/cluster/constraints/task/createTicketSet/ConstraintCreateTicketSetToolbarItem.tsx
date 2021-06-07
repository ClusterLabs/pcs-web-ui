import React from "react";
import { Button } from "@patternfly/react-core";

import {
  ClusterWizardFooter,
  TaskFinishLibWizard,
  Wizard,
} from "app/view/share";

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
          data-test="task-constraint-ticket-set-create"
          title="New ticket set constraint"
          description="Create ticket set constraint"
          onClose={close}
          steps={[
            {
              name: "Resource Sets",
              component: <ResourceSetList />,
              footer: (
                <ClusterWizardFooter
                  onClose={close}
                  nextIf={areSetsValid}
                  backDisabled
                />
              ),
            },
            {
              name: "Options",
              canJumpTo: areSetsValid,
              component: <Options />,
              footer: (
                <ClusterWizardFooter
                  onClose={close}
                  nextIf={isCustomIdValid && isTicketValid}
                />
              ),
            },
            {
              name: "Review",
              canJumpTo: areSetsValid && isCustomIdValid && isTicketValid,
              component: <Review />,
              footer: (
                <ClusterWizardFooter
                  preNext={() => create({ force: false })}
                  nextLabel="Create constraint"
                  onClose={close}
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
