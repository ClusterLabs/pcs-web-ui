import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceMove.reviewFooter;

export const ReviewFooter = () => {
  const {move} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceMove.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Move resource"
        preAction={move}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
