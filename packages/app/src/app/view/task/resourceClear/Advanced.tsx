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
      expiredOnly,
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
        <FormGroup
          fieldId="settings-expired-only"
          label="Expired constraints only"
        >
          <Checkbox
            label="Remove already expired constraints only"
            aria-label="Remove only already expired constraints"
            id="settings-expired-only"
            isChecked={expiredOnly}
            onChange={(checked: boolean) => updateState({expiredOnly: checked})}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
