import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.addNode.sbdFooter;

export const SbdFooter = () => {
  return (
    <TaskFooter {...testMarks.task.addNode.sbdFooter.mark}>
      <WizardFooterNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
