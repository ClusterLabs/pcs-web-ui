import {Form, FormGroup} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormRadios, FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {options} = testMarks.task.sbdConfigure;

export const Options = () => {
  const {
    state: {
      delayStart,
      startmode,
      watchdogTimeout,
      timeoutActionFlush,
      timeoutAction,
      showValidationErrors,
      libCall: {reports},
    },
    isWatchdogTimeoutValid,
    getSbdTimeout,
    updateState,
  } = useTask();

  return (
    <TaskLibStep title="SBD options" reports={reports} {...options.mark}>
      <Form>
        <FormRadios
          id="new_sbd_delay_start"
          label="SBD_DELAY_START"
          options={["DEFAULT", "yes", "no"]}
          selected={delayStart}
          onChange={value => updateState({delayStart: value})}
          {...options.delayStart.mark}
        />

        <FormRadios
          id="new_startmode"
          label="SBD_STARTMODE"
          options={["DEFAULT", "clean", "always"]}
          selected={startmode}
          onChange={value => updateState({startmode: value})}
          {...options.startmode.mark}
        />

        <FormText
          id="new_watchdog_timeout"
          label="SBD_WATCHDOG_TIMEOUT"
          onChange={value => updateState({watchdogTimeout: value})}
          value={watchdogTimeout}
          placeholder={watchdogTimeout}
          showValidationErrors={showValidationErrors}
          isValid={isWatchdogTimeoutValid}
          helperTextInvalid="Please enter a non negative integer"
          {...options.watchdogTimeout.mark}
        />

        <FormGroup fieldId={"new_timeout_action"}>
          <FormRadios
            id="new_timeout_action1"
            label={
              <>
                <span>SBD_TIMEOUT_ACTION</span>
                <span> </span>
                <span style={{fontWeight: "normal"}}>({getSbdTimeout()})</span>
              </>
            }
            options={["DEFAULT", "flush", "noflush"]}
            selected={timeoutActionFlush}
            onChange={value => updateState({timeoutActionFlush: value})}
            {...options.timeoutActionFlush.mark}
          />
          <FormRadios
            id="new_timeout_action2"
            label={null}
            options={["DEFAULT", "reboot", "crashdump", "off"]}
            selected={timeoutAction}
            onChange={value => updateState({timeoutAction: value})}
            {...options.timeoutActionDo.mark}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
