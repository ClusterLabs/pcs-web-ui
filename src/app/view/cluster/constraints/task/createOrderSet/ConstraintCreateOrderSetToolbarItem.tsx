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

export const ConstraintCreateOrderSetToolbarItem: React.FC<{
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
        data-test="constraint-order-create"
      >
        Create Order Set
      </Button>
      {isOpened && (
        <Wizard
          data-test="task-constraint-order-set-create"
          title="New order set constraint"
          description="Create order set constraint"
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
                <ClusterWizardFooter onClose={close} nextIf={isCustomIdValid} />
              ),
            },
            {
              name: "Review",
              canJumpTo: areSetsValid && isCustomIdValid,
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
                  taskName="create order constraint with resource set"
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
