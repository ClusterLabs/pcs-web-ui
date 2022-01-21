import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { ResourceSetList } from "./ResourceSetList";
import { Review } from "./Review";

export const ConstraintCreateColocationSetToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    create,
    isOpened,
    areSetsValid,
    isCustomIdValid,
    isScoreValid,
    state: {
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-colocation-create"
      >
        Create Colocation Set
      </Button>
      {isOpened && (
        <Wizard
          task="constraintColocationSetCreate"
          data-test="task-constraint-colocation-set-create"
          title="New colocation set constraint"
          description="Create colocation set constraint"
          onClose={close}
          steps={[
            {
              name: "Resource Sets",
              component: <ResourceSetList />,
              footer: (
                <WizardFooter
                  next={{ actionIf: areSetsValid }}
                  back={{ disabled: true }}
                />
              ),
            },
            {
              name: "Options",
              canJumpTo: areSetsValid,
              component: <Options />,
              footer: (
                <WizardFooter
                  next={{
                    actionIf: isCustomIdValid && isScoreValid,
                  }}
                />
              ),
            },
            {
              name: "Review",
              canJumpTo: areSetsValid && isCustomIdValid && isScoreValid,
              component: <Review />,
              footer: (
                <WizardFooter
                  next={{
                    preAction: () => create({ force: false }),
                    label: "Create colocation constraint",
                  }}
                />
              ),
            },
            {
              name: "Result",
              component: (
                <TaskFinishLibWizard
                  response={response}
                  taskName="create colocation constraint with resource set"
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
