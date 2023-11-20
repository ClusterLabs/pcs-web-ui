import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.nodeAdd.sbdFooter;

export const SbdFooter = () => {
  return (
    <TaskFooter {...testMarks.task.nodeAdd.sbdFooter.mark}>
      <TaskButtonWizardNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
