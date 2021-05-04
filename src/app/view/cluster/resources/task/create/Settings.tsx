import React from "react";
import { Checkbox, Form, FormGroup } from "@patternfly/react-core";

import { TaskLibStep } from "app/view/share";

import { SettingsGroup } from "./SettingsGroup";
import { useTask } from "./useTask";

export const Settings: React.FC = () => {
  const {
    state: { reports, clone, promotable, disabled, useGroup },
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
                ...(!checked ? { promotable: false } : {}),
              })
            }
          />
          {clone && (
            <Checkbox
              label="Promotable"
              aria-label="Clone"
              id="settings-promotable"
              isChecked={clone && promotable}
              onChange={(checked: boolean) =>
                updateState({ promotable: checked })
              }
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
            onChange={(checked: boolean) => updateState({ disabled: checked })}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
