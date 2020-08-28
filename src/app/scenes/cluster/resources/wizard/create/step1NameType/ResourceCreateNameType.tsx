import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

import { ResourceCreateNameTypeTypeSelect } from "./ResourceCreateNameTypeTypeSelect";

export const ResourceCreateNameType: React.FC = () => {
  const {
    wizardState: { agentName, resourceName, showValidationErrors, reports },
    clusterUrlName,
    dispatch,
  } = useWizard();

  const onSelect = (value: string) => {
    dispatch({
      type: "RESOURCE_AGENT.ENSURE",
      payload: { clusterUrlName, agentName: value.toString() },
    });
    dispatch({
      type: "RESOURCE.PRIMITIVE.CREATE.SET_AGENT_NAME",
      payload: { clusterUrlName, agentName: value.toString() },
    });
  };

  const onClear = () => {
    dispatch({
      type: "RESOURCE.PRIMITIVE.CREATE.SET_AGENT_NAME",
      payload: { clusterUrlName, agentName: "" },
    });
  };

  const changeResourceName = (value: string) =>
    dispatch({
      type: "RESOURCE.PRIMITIVE.CREATE.SET_RESOURCE_NAME",
      payload: { clusterUrlName, resourceName: value },
    });

  const resourceNameValidated =
    showValidationErrors && resourceName.length === 0 ? "error" : "default";
  const agentNameValidated =
    showValidationErrors && agentName.length === 0 ? "error" : "default";

  return (
    <WizardLibStep
      title="Choose name and type for the new resource"
      reports={reports}
    >
      <Form isHorizontal>
        <FormGroup
          label="Resource name"
          isRequired
          fieldId="new-resource-name"
          helperTextInvalid="Please provide the new resource name"
          validated={resourceNameValidated}
        >
          <TextInput
            id="new-resource-name"
            value={resourceName}
            isRequired
            type="text"
            onChange={changeResourceName}
            validated={resourceNameValidated}
          />
        </FormGroup>
        <FormGroup
          label="Resource type"
          isRequired
          fieldId="new-resource-agent-name"
          helperTextInvalid="Please select resource agent"
          validated={agentNameValidated}
        >
          <ResourceCreateNameTypeTypeSelect
            onSelect={onSelect}
            onClear={onClear}
            agentName={agentName}
          />
        </FormGroup>
      </Form>
    </WizardLibStep>
  );
};
