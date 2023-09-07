import {Checkbox, Form, FormGroup} from "@patternfly/react-core";

import {TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Settings = () => {
  const {
    state: {
      libCall: {reports},
      disabled,
    },
    updateState,
  } = useTask();

  return (
    <TaskLibStep title="Settings" reports={reports}>
      <Form>
        <FormGroup fieldId="settings-disabled" label="Start automatically">
          <Checkbox
            label="Disabled"
            id="settings-disabled"
            aria-label="Disabled"
            isChecked={disabled}
            onChange={(checked: boolean) => updateState({disabled: checked})}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
