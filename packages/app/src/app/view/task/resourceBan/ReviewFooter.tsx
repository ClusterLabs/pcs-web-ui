import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceBan.reviewFooter;

export const ReviewFooter = () => {
  const {ban} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceBan.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Ban resource"
        preAction={() => ban()}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
