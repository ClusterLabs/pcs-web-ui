import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.createAclRole.addPermissionsFooter;

export const AddPermissionsFooter = () => {
  const {isNameValid, invalidPermissionIndexes} = useTask();
  return (
    <TaskFooter {...testMarks.task.createAclRole.addPermissionsFooter.mark}>
      <WizardFooterNext
        actionIf={isNameValid && invalidPermissionIndexes.length === 0}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
