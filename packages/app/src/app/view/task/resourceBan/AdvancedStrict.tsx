import {Checkbox} from "@patternfly/react-core";

import {FormGroup} from "app/view/share";

import {useTask} from "./useTask";

export const AdvancedStrict = () => {
  const {
    updateState,
    state: {strictMode},
  } = useTask();
  return (
    <FormGroup
      fieldId="settings-strict-mode"
      label="Strict mode"
      popover={{
        header: <>Strict mode</>,
        body: (
          <>
            If is checked, the command will also fail if other resources would
            be affected.
          </>
        ),
      }}
    >
      <Checkbox
        label="Use strict mode"
        aria-label="Use strict mode"
        id="settings-specify-node"
        isChecked={strictMode}
        onChange={(checked: boolean) => updateState({strictMode: checked})}
      />
    </FormGroup>
  );
};
