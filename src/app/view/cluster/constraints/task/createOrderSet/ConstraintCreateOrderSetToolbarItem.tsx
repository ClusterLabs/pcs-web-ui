import React from "react";
import { Button } from "@patternfly/react-core";

import { Wizard } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { OptionsFooter } from "./OptionsFooter";
import { ResourceSetList } from "./ResourceSetList";

export const ConstraintCreateOrderSetToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, close, isOpened } = useTask();
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
              footer: <OptionsFooter />,
            },
            {
              name: "Resource Sets",
              component: <ResourceSetList />,
              footer: <OptionsFooter />,
            },
          ]}
        />
      )}
    </>
  );
};
