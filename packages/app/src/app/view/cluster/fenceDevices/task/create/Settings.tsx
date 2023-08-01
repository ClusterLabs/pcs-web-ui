import {Checkbox, Form, FormGroup} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {settings} = testMarks.task.createFenceDevice;

export const Settings = () => {
  const {
    state: {
      libCall: {reports},
      disabled,
    },
    updateState,
  } = useTask();

  return (
    <TaskLibStep title="Settings" reports={reports} {...settings.mark}>
      <Form>
        <FormGroup fieldId="settings-disabled" label="Start automatically">
          <Checkbox
            label="Disabled"
            id="settings-disabled"
            aria-label="Disabled"
            isChecked={disabled}
            onChange={(checked: boolean) => updateState({disabled: checked})}
            {...settings.disabled.mark}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
