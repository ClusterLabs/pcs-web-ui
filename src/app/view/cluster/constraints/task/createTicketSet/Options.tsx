import React from "react";
import { Form } from "@patternfly/react-core";

import { FormRadios, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    state: { reports, lossPolicy },
  } = useTask();
  return (
    <TaskLibStep title="Order constraint options" reports={reports}>
      <Form isHorizontal>
        <FormRadios
          id="constraint-order-set-kind"
          label="Loss policy"
          options={["stop", "fence", "freeze", "demote"]}
          selected={lossPolicy}
          onChange={value => updateState({ lossPolicy: value })}
          popover={{
            header: (
              <>
                Defines what should happen to the respective resources if the
                ticket is revoked
              </>
            ),
            body: (
              <>
                Allowed values:
                <dl>
                  <dd>
                    <strong>fence</strong>
                  </dd>
                  <dt>
                    Fence the nodes that are running the relevant resources.
                  </dt>
                  <dd>
                    <strong>stop</strong>
                  </dd>
                  <dt>Stop the relevant resources.</dt>
                  <dd>
                    <strong>freeze</strong>
                  </dd>
                  <dt>Do nothing to the relevant resources.</dt>
                  <dd>
                    <strong>demote</strong>
                  </dd>
                  <dt>
                    Demote relevant resources that are running in master mode to
                    slave mode.
                  </dt>
                </dl>
              </>
            ),
          }}
        />
      </Form>
    </TaskLibStep>
  );
};
