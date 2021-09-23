import React from "react";
import { Form, FormGroup } from "@patternfly/react-core";

import { FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";
import { NameTypeTypeSelect } from "./NameTypeTypeSelect";

export const NameType: React.FC = () => {
  const {
    state: {
      agentName,
      fenceDeviceName,
      showValidationErrors,
      libCall: { reports },
    },
    clusterName,
    dispatch,
    updateState,
  } = useTask();

  const onSelect = (value: string) => {
    dispatch({
      type: "FENCE_AGENT.ENSURE",
      key: { clusterName },
      payload: { agentName: value.toString() },
    });
    updateState({ agentName: value.toString(), instanceAttrs: {} });
  };

  const onClear = () => updateState({ agentName: "" });

  const changeFenceDeviceName = (value: string) =>
    updateState({ fenceDeviceName: value });

  const agentNameValidated =
    showValidationErrors && agentName.length === 0 ? "error" : "default";

  return (
    <TaskLibStep
      title="Choose name and type for the new fence device"
      reports={reports}
    >
      <Form>
        <FormText
          id="new-fence-devicd-name"
          label="Fence device name"
          onChange={changeFenceDeviceName}
          value={fenceDeviceName}
          helperTextInvalid="Please provide the new fence device name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={fenceDeviceName.length > 0}
        />
        <FormGroup
          label="Fence device type"
          isRequired
          fieldId="new-fence-devicd-agent-name"
          helperTextInvalid="Please select a fence device agent"
          validated={agentNameValidated}
        >
          <NameTypeTypeSelect
            onSelect={onSelect}
            onClear={onClear}
            agentName={agentName}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
