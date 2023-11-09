import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.resourceMove.nodeFooter;

export const NodeFooter = () => {
  return (
    <TaskFooter {...testMarks.task.resourceMove.nodeFooter.mark}>
      <TaskButtonWizardNext {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
