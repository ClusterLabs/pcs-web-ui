import React from "react";
import {
  Form,
  FormGroup,
  Text,
  TextContent,
  TextInput,
} from "@patternfly/react-core";

import { types, useDispatch } from "app/store";
import { ResourceCreateNameTypeTypeSelect } from "./ResourceCreateNameTypeTypeSelect";
import { ResourceCreateReports } from "./ResourceCreateReports";

export const ResourceCreateNameType: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
  clusterUrlName: string;
}> = ({
  wizardState: { agentName, resourceName, showValidationErrors },
  clusterUrlName,
}) => {
  const dispatch = useDispatch();

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
    <>
      <TextContent>
        <Text component="h2">Choose name and type for the new resource</Text>
      </TextContent>

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
      <ResourceCreateReports />
    </>
  );
};
