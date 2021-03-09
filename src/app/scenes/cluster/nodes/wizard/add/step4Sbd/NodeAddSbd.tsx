import React from "react";
import { Alert, Checkbox, Form, FormGroup } from "@patternfly/react-core";

import { AttributeHelpPopover, FormText, WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddSbd: React.FC = () => {
  const {
    isSbdEnabled,
    updateState,
    state: { sbdWatchdog, sbdDevices, sbdNoWatchdogValidation, reports },
  } = useWizard();
  const changeWatchdog = (value: string) => updateState({ sbdWatchdog: value });
  const changeDevice = (index: number, value: string) =>
    updateState({
      sbdDevices: sbdDevices.map((device, i) =>
        i === index ? value : device,
      ) as typeof sbdDevices,
    });
  return (
    <WizardLibStep title="Configure sbd" reports={reports}>
      {!isSbdEnabled && (
        <Alert
          variant="info"
          isInline
          title="Sbd has not been detected on the cluster."
        />
      )}
      {isSbdEnabled && (
        <Form isHorizontal>
          <FormText
            id="sbd-watchdog"
            label="Watchdog"
            onChange={changeWatchdog}
            value={sbdWatchdog}
            placeholder="/dev/watchdog"
          />

          <FormGroup
            label="Do not validate watchdog"
            labelIcon={
              <AttributeHelpPopover
                header="Do not validate watchdog"
                body={
                  "By default, it is tested whether the specified watchdog"
                  + " is supported. This may cause a restart of the system when"
                  + " a watchdog with no-way-out-feature enabled is present."
                  + " Use this field to skip watchdog validation."
                }
              />
            }
            fieldId="sbd-no-watchdog-validation"
          >
            <Checkbox
              isChecked={sbdNoWatchdogValidation}
              name="sbd-no-watchdog-validation"
              onChange={c => updateState({ sbdNoWatchdogValidation: c })}
              id="sbd-no-watchdog-validation"
            />
          </FormGroup>
          <Alert
            variant="info"
            isInline
            title={
              "Please specify the number of devices that is compatible with"
              + " this cluster"
            }
          />
          {sbdDevices.map((device, i) => (
            <FormText
              key={i}
              id={`sbd-device-${i}`}
              label={`Device ${i + 1}`}
              value={device}
              onChange={(value: string) => changeDevice(i, value)}
            />
          ))}
        </Form>
      )}
    </WizardLibStep>
  );
};
