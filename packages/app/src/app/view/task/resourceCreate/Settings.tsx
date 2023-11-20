import {Checkbox, Form, FormGroup} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {TaskLibStep} from "app/view/share";

import {SettingsGroup} from "./SettingsGroup";
import {useTask} from "./useTask";

const {settings} = testMarks.task.resourceCreate;

export const Settings = () => {
  const {
    state: {
      libCall: {reports},
      clone,
      promotable,
      disabled,
      useGroup,
    },
    updateState,
  } = useTask();

  return (
    <TaskLibStep title="Settings" reports={reports}>
      <Form>
        <FormGroup isInline label="Multiple instances" fieldId="settings-clone">
          <Checkbox
            label="Clone"
            aria-label="Clone"
            id="settings-clone"
            isChecked={clone}
            isDisabled={useGroup !== "no"}
            onChange={(checked: boolean) =>
              updateState({
                clone: checked,
                ...(!checked ? {promotable: false} : {}),
              })
            }
            {...settings.disabled.mark}
          />
          {clone && (
            <Checkbox
              label="Promotable"
              aria-label="Clone"
              id="settings-promotable"
              isChecked={clone && promotable}
              onChange={(checked: boolean) =>
                updateState({promotable: checked})
              }
              {...settings.promotable.mark}
            />
          )}
        </FormGroup>

        <FormGroup fieldId="settings-group" label="Group">
          <SettingsGroup />
        </FormGroup>

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
