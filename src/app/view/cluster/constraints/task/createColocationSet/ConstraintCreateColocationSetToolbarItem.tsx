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
          data-test="task-constraint-colocation-set-create"
          title="New colocation set constraint"
          description="Create colocation set constraint"
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
                  task="constraintColocationSetCreate"
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
                  nextIf={isCustomIdValid}
                  task="constraintColocationSetCreate"
                />
              ),
            },
            {
              name: "Review",
              canJumpTo: areSetsValid && isCustomIdValid,
              component: <Review />,
              footer: (
                <ClusterWizardFooter
                  preNext={() => create({ force: false })}
                  nextLabel="Create colocation constraint"
                  onClose={close}
                  task="constraintColocationSetCreate"
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
