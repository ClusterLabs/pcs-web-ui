import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.sbdConfigure.reviewFooter;

export const ReviewFooter = () => {
  const {sbdConfigure} = useTask();
  return (
    <TaskFooter {...testMarks.task.clusterSetup.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Configure SBD"
        preAction={() => sbdConfigure({force: false})}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
