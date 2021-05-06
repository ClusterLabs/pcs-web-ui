import React from "react";
import { Form } from "@patternfly/react-core";

import { FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    state: { id, reports },
  } = useTask();
  return (
    <TaskLibStep title="Order constraint options" reports={reports}>
      <Form isHorizontal>
        <FormText
          id="constraint-order-set-id"
          label="Constraint id"
          onChange={value => updateState({ id: value })}
          value={id}
          popover={{
            header: "Constraint id",
            body: (
              <>
                You can optionally put constraint id here. Constraint id will be
                generated automatically if constraint id is not specified.
              </>
            ),
          }}
        />
      </Form>
    </TaskLibStep>
  );
};
