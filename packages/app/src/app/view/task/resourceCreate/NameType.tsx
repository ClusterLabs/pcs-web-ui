import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormGroup, FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";
import {NameTypeTypeSelect} from "./NameTypeTypeSelect";

const {nameType} = testMarks.task.resourceCreate;
export const NameType = () => {
  const {
    state: {
      agentName,
      resourceName,
      showValidationErrors,
      libCall: {reports},
    },
    updateState,
  } = useTask();

  const changeResourceName = (value: string) =>
    updateState({resourceName: value});

  const agentNameValidated =
    showValidationErrors && agentName.length === 0 ? "error" : "default";

  return (
    <TaskLibStep
      title="Choose name and type for the new resource"
      reports={reports}
      {...nameType.mark}
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
          <NameTypeTypeSelect />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
