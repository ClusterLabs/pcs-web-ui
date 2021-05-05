import React from "react";
import { Button } from "@patternfly/react-core";

import { ClusterWizardFooter, Wizard } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { ResourceSetList } from "./ResourceSetList";
import { Review } from "./Review";

export const ConstraintCreateTicketSetToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, close, isOpened, areSetsValid, create } = useTask();
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
              footer: <ClusterWizardFooter onClose={close} />,
            },
            {
              name: "Review",
              canJumpTo: areSetsValid,
              component: <Review />,
              footer: (
                <ClusterWizardFooter
                  preNext={() => create({ force: false })}
                  nextLabel="Create constraint"
                  onClose={close}
                />
              ),
            },
          ]}
        />
      )}
    </>
  );
};
