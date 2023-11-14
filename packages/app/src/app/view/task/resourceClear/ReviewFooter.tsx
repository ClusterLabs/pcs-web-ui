import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceClear.reviewFooter;

export const ReviewFooter = () => {
  const {clear} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceClear.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Clear resource"
        preAction={() => clear()}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
