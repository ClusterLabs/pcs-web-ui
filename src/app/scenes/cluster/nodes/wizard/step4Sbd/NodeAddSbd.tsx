import React from "react";
import {
  Alert,
  Checkbox,
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddSbd: React.FC = () => {
  const {
    isSbdEnabled,
    updateState,
    state: { sbdWatchdog, sbdDevices, sbdNoWatchdogValidation },
  } = useWizard();
  const changeWatchdog = (value: string) => updateState({ sbdWatchdog: value });
  const changeDevice = (index: number, value: string) =>
    updateState({
      sbdDevices: sbdDevices.map((device, i) =>
        i === index ? value : device,
      ) as typeof sbdDevices,
    });
  return (
    <WizardLibStep title="Configure sbd">
      {!isSbdEnabled && (
        <Alert
          variant="info"
          isInline
          title="Sbd has not been detected on the cluster."
        />
      )}
      {isSbdEnabled && (
        <Form isHorizontal>
          <FormGroup label="Watchdog" fieldId="sbd-watchdog">
            <TextInput
              id="sbd-watchdog"
              value={sbdWatchdog}
              isRequired
              type="text"
              onChange={changeWatchdog}
              placeholder="/dev/watchdog"
            />
          </FormGroup>

          <FormGroup
            label="Do not validate watchdog"
            fieldId="sbd-no-watchdog-validation"
          >
            <Checkbox
              isChecked={sbdNoWatchdogValidation}
              name="sbd-no-watchdog-validation"
              onChange={c => updateState({ sbdNoWatchdogValidation: c })}
              id="sbd-no-watchdog-validation"
            />
          </FormGroup>
          {sbdDevices.map((device, i) => (
            <FormGroup
              key={i}
              label={`Device ${i + 1}`}
              fieldId={`sbd-device-${i}`}
            >
              <TextInput
                id={`sbd-device-${i}`}
                value={device}
                isRequired
                type="text"
                onChange={(value: string) => changeDevice(i, value)}
              />
            </FormGroup>
          ))}
        </Form>
      )}
    </WizardLibStep>
  );
};
