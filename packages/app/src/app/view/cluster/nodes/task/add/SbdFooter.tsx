import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.nodeAdd.sbdFooter;

export const SbdFooter = () => {
  return (
    <TaskFooter {...testMarks.task.nodeAdd.sbdFooter.mark}>
      <WizardFooterNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
