import {Checkbox, Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormGroup, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Advanced = () => {
  const {
    updateState,
    state: {
      resourceType,
      isPromotable,
      limitToPromoted,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Advanced settings"
      reports={reports}
      {...testMarks.task.resourceClear.mark}
    >
      <Form>
        {resourceType === "clone" && isPromotable && (
          <FormGroup
            fieldId="settings-promotable-clone"
            label="Promotable clone"
          >
            <Checkbox
              label="Limit the action scope to the Promoted role"
              aria-label="Limit the action scope to the Promoted role"
              id="settings-limit-to-promoted"
              isChecked={limitToPromoted}
              onChange={(checked: boolean) =>
                updateState({limitToPromoted: checked})
              }
            />
          </FormGroup>
        )}
      </Form>
    </TaskLibStep>
  );
};
