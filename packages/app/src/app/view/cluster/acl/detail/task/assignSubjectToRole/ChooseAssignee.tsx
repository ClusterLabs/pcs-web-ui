import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {tools} from "app/store";
import {FormSelect} from "app/view/share";

import {useTask} from "./useTask";

export const ChooseAssignee = () => {
  const {
    isAssigneeValid,
    updateAssigneeId,
    assigneeType,
    assigneeId,
    assignableitems,
    state: {showValidationErrors},
  } = useTask();

  if (assignableitems.length === 0) {
    return <div>Nothing to assign</div>;
  }

  return (
    <Form style={{marginBottom: "8em"}}>
      <FormSelect
        id="acl-assignee-select"
        label={`${tools.labelize(assigneeType)} name`}
        placeholderText={`Please select a ${assigneeType}`}
        showValidationErrors={showValidationErrors}
        isValid={isAssigneeValid}
        helperTextInvalid={`Please select a ${assigneeType}`}
        isRequired
        onSelect={value => updateAssigneeId(value.toString())}
        selections={assigneeId}
        optionsValues={assignableitems.filter(i => i !== assigneeId)}
        {...testMarks.task.aclAssignSubjectToRole.name.mark}
      />
    </Form>
  );
};
