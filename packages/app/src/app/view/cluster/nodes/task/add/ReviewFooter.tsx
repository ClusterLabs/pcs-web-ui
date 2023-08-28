import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.nodeAdd.reviewFooter;

export const ReviewFooter = () => {
  const {nodeAdd} = useTask();
  return (
    <TaskFooter {...testMarks.task.nodeAdd.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Add node"
        preAction={nodeAdd}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
