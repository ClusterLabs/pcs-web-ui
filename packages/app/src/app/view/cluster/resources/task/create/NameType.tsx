import {Form, FormGroup} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";
import {NameTypeTypeSelect} from "./NameTypeTypeSelect";

const {nameType} = testMarks.createResource;
export const NameType = () => {
  const {
    state: {
      agentName,
      resourceName,
      showValidationErrors,
      libCall: {reports},
    },
    clusterName,
    dispatch,
    updateState,
  } = useTask();

  const onSelect = (value: string) => {
    dispatch({
      type: "RESOURCE_AGENT.ENSURE",
      key: {clusterName},
      payload: {agentName: value.toString()},
    });
    updateState({agentName: value.toString()});
  };

  const onClear = () => updateState({agentName: ""});

  const changeResourceName = (value: string) =>
    updateState({resourceName: value});

  const agentNameValidated =
    showValidationErrors && agentName.length === 0 ? "error" : "default";

  return (
    <TaskLibStep
      title="Choose name and type for the new resource"
      reports={reports}
    >
      <Form>
        <FormText
          id="new-resource-name"
          label="Resource name"
          onChange={changeResourceName}
          value={resourceName}
          helperTextInvalid="Please provide the new resource name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={resourceName.length > 0}
          {...nameType.name.mark}
        />
        <FormGroup
          label="Resource type"
          isRequired
          fieldId="new-resource-agent-name"
          helperTextInvalid="Please select a resource agent"
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
