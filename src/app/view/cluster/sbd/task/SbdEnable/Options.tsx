import { Form } from "@patternfly/react-core";

import { FormRadios, FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    state: { 
      delayStart,
      startmode,
      watchdogTimeout,
      libCall: { reports },
    },
    updateState,
  } = useTask();
  return (
    <TaskLibStep title="SBD options" reports={reports}>
      <Form data-test="form-options">
        <FormRadios
          id="new_sbd_delay_start"
          label="SBD_DELAY_START"
          options={["DEFAULT", "yes", "no"]}
          selected={delayStart}
          onChange={value => updateState({ delayStart: value })}
        />

        <FormRadios
          id="new_startmode"
          label="SBD_STARTMODE"
          options={["DEFAULT", "clean", "always"]} 
          selected={startmode}
          onChange={value => updateState({ startmode: value })}
        />

        <FormText
          id="new_watchdog_timeout"
          label="SBD_WATCHDOG_TIMEOUT"
          onChange={value => updateState({ watchdogTimeout: value })}
          value={watchdogTimeout}
          placeholder="5"
        />
      </Form>
    </TaskLibStep>
  );
};
