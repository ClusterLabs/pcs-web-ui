import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.resourceClear.advancedFooter;

export const AdvancedFooter = () => {
  return (
    <TaskFooter {...testMarks.task.resourceClear.advancedFooter.mark}>
      <TaskButtonWizardNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
