import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.aclRoleCreate.reviewFooter;

export const ReviewFooter = () => {
  const {aclRoleCreate} = useTask();
  return (
    <TaskFooter {...testMarks.task.aclRoleCreate.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Create role"
        preAction={() => aclRoleCreate()}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
