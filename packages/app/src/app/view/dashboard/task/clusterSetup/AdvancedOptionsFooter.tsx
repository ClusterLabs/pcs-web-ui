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
  testMarks.task.clusterSetup.advancedOptionsFooter;

export const AdvancedOptionsFooter = () => {
  const {areLinksValid} = useTask();
  return (
    <TaskFooter {...testMarks.task.clusterSetup.advancedOptionsFooter.mark}>
      <TaskButtonWizardNext actionIf={areLinksValid} {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonReviewAndFinish
        label="Review and setup cluster"
        {...reviewAndFinish.mark}
      />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
