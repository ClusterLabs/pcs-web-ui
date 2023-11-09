import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.aclRoleCreate.addPermissionsFooter;

export const AddPermissionsFooter = () => {
  const {isNameValid, invalidPermissionIndexes} = useTask();
  return (
    <TaskFooter {...testMarks.task.aclRoleCreate.addPermissionsFooter.mark}>
      <TaskButtonWizardNext
        actionIf={isNameValid && invalidPermissionIndexes.length === 0}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
