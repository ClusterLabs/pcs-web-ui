import React from "react";
import { Button } from "@patternfly/react-core";

import { Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { ResourceSetList } from "./ResourceSetList";
import { Review } from "./Review";
import { Finish } from "./Finish";

export const ConstraintCreateOrderSetToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, close, create, isOpened } = useTask();
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
              name: "Options",
              component: <Options />,
              footer: <WizardFooter onClose={close} backDisabled />,
            },
            {
              name: "Resource Sets",
              component: <ResourceSetList />,
              footer: <WizardFooter onClose={close} />,
            },
            {
              name: "Review",
              component: <Review />,
              footer: (
                <WizardFooter
                  preNext={() => create({ force: false })}
                  nextLabel="Create constraint"
                  onClose={close}
                />
              ),
            },
            {
              name: "Result",
              component: <Finish />,
              isFinishedStep: true,
            },
          ]}
        />
      )}
    </>
  );
};
