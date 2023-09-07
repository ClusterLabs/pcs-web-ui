import {Form} from "@patternfly/react-core";

import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const NodeName = () => {
  const {
    state: {
      libCall: {reports},
      nodeName,
      showValidationErrors,
    },
    updateNodeName,
  } = useTask();

  return (
    <TaskLibStep
      title="Enter name of a node from a cluster you want to add"
      reports={reports}
    >
      <Form data-test="form-node-name">
        <FormText
          id="node-name"
          label="Node name"
          onChange={updateNodeName}
          value={nodeName}
          helperTextInvalid="Please provide the node name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={nodeName.length > 0}
          data-test="node-name"
        />
      </Form>
    </TaskLibStep>
  );
};
