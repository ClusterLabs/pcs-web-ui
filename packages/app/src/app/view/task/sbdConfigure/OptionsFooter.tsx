import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.sbdConfigure.optionsFooter;

export const OptionsFooter = () => {
  const {isWatchdogTimeoutValid} = useTask();
  return (
    <TaskFooter {...testMarks.task.sbdConfigure.optionsFooter.mark}>
      <TaskButtonWizardNext actionIf={isWatchdogTimeoutValid} {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
