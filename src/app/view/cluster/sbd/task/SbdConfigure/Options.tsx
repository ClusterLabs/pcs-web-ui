import { Form, FormGroup } from "@patternfly/react-core";

import { FormRadios, FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options = () => {
  const {
    state: {
      delayStart,
      startmode,
      watchdogTimeout,
      timeoutActionFlush,
      timeoutAction,
      libCall: { reports },
    },
    getSbdTimeout,
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
          placeholder={watchdogTimeout}
        />

        <FormGroup fieldId={"new_timeout_action"}>
          <FormRadios
            id="new_timeout_action1"
            label={
              <>
                <span>SBD_TIMEOUT_ACTION</span>
                <span> </span>
                <span style={{ fontWeight: "normal" }}>
                  ({getSbdTimeout()})
                </span>
              </>
            }
            options={["DEFAULT", "flush", "noflush"]}
            selected={timeoutActionFlush}
            onChange={value => updateState({ timeoutActionFlush: value })}
          />
          <FormRadios
            id="new_timeout_action2"
            label={null}
            options={["DEFAULT", "reboot", "crashdump", "off"]}
            selected={timeoutAction}
            onChange={value => updateState({ timeoutAction: value })}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
