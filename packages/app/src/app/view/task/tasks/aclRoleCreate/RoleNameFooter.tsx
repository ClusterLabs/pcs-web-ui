import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.aclRoleCreate.roleNameFooter;

export const RoleNameFooter = () => {
  const {isNameValid} = useTask();
  return (
    <TaskFooter {...testMarks.task.aclRoleCreate.roleNameFooter.mark}>
      <TaskButtonWizardNext actionIf={isNameValid} {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
