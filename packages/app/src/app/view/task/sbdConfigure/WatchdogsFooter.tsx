import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.sbdConfigure.watchdogsFooter;

export const WatchdogsFooter = () => {
  return (
    <TaskFooter {...testMarks.task.sbdConfigure.watchdogsFooter.mark}>
      <TaskButtonWizardNext {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
