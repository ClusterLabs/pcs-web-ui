import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.createAclRole.roleNameFooter;

export const RoleNameFooter = () => {
  const {isNameValid} = useTask();
  return (
    <TaskFooter {...testMarks.createAclRole.roleNameFooter.mark}>
      <WizardFooterNext actionIf={isNameValid} {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
