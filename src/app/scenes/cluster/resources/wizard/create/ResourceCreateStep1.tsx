import React from "react";
import {
  Form,
  FormGroup,
  Text,
  TextContent,
  TextInput,
} from "@patternfly/react-core";

import { useClusterSelector } from "app/view";

import { selectors, useDispatch } from "app/store";
import { ResourceCreateStep1TypeSelect } from "./ResourceCreateStep1TypeSelect";

export const ResourceCreateStep1 = () => {
  const dispatch = useDispatch();
  const [{ agentName, resourceName }, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );

  const onSelect = (value: string) => {
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
          helperText="Please provide the new resource name"
        >
          <TextInput
            id="new-resource-name"
            value={resourceName}
            isRequired
            type="text"
            onChange={changeResourceName}
          />
        </FormGroup>
        <FormGroup
          label="Resource type"
          isRequired
          fieldId="new-resource-agent-name"
          helperText="Please select resource agent"
        >
          <ResourceCreateStep1TypeSelect
            onSelect={onSelect}
            onClear={onClear}
            agentName={agentName}
          />
        </FormGroup>
      </Form>
    </>
  );
};
