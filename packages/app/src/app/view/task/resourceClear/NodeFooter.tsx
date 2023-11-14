import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonReviewAndFinish,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel, reviewAndFinish} =
  testMarks.task.resourceClear.nodeFooter;

export const NodeFooter = () => {
  const {isNodeSettingConsistent} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceClear.nodeFooter.mark}>
      <TaskButtonWizardNext actionIf={isNodeSettingConsistent} {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonReviewAndFinish
        runIf={isNodeSettingConsistent}
        label="Review and clear resource"
        {...reviewAndFinish.mark}
      />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
