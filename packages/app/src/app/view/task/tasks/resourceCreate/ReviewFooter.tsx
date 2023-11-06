import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceCreate.reviewFooter;

export const ReviewFooter = () => {
  const {create} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceCreate.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Create resource"
        preAction={() => create({force: false})}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
