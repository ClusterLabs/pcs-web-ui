import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormRadios, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";
import {AdvancedLifetime} from "./AdvancedLifetime";
import {AdvancedStrict} from "./AdvancedStrict";

export const Advanced = () => {
  const {
    updateState,
    state: {
      constraintHandling,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Advanced settings"
      reports={reports}
      {...testMarks.task.resourceMove.mark}
    >
      <Form>
        <FormRadios
          id="settings-constraint-handling"
          label="Constraint handling"
          options={["autoclean", "expire", "keep"]}
          selected={constraintHandling}
          onChange={value => updateState({constraintHandling: value})}
          popover={{
            header: <>Constraint handling</>,
            body: (
              <>
                Move the resource off the node it is currently running on is
                achieved by creating a location constraint and there are 3
                options to deal with it:
                <dl>
                  <dd>
                    <strong>autoclean</strong>
                  </dd>
                  <dt>
                    The constraint is deleted once the resource is running on
                    its new location. This option also allows to use strict
                    mode.
                  </dt>
                  <dd>
                    <strong>expire</strong>
                  </dd>
                  <dt>
                    The constraint will expire after some period. Constraint
                    needs to be cleared manually. A lifetime must be specified
                    for this option.
                  </dt>
                  <dd>
                    <strong>keep</strong>
                  </dd>
                  <dt>
                    The constraint will not expire and needs to be cleared
                    manually.
                  </dt>
                </dl>
              </>
            ),
          }}
        />
        {constraintHandling === "expire" && <AdvancedLifetime />}
        {constraintHandling === "autoclean" && <AdvancedStrict />}
      </Form>
    </TaskLibStep>
  );
};
