import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {nodeName: nodeNameStep} = testMarks.task.nodeAdd;

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
      title="Choose node name"
      reports={reports}
      {...nodeNameStep.mark}
    >
      <Form>
        <FormText
          id="new-node-name"
          label="Node name"
          onChange={updateNodeName}
          value={nodeName}
          helperTextInvalid="Please provide the node name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={nodeName.length > 0}
          {...nodeNameStep.name.mark}
        />
      </Form>
    </TaskLibStep>
  );
};
