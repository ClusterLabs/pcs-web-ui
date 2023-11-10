import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceMove.advancedFooter;

export const AdvancedFooter = () => {
  const {isConstraintLifetimeConsistent} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceMove.advancedFooter.mark}>
      <TaskButtonWizardNext
        actionIf={isConstraintLifetimeConsistent}
        {...next.mark}
      />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
