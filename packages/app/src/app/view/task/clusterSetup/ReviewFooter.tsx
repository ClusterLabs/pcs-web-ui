import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.clusterSetup.reviewFooter;

export const ReviewFooter = () => {
  const {setupCluster} = useTask();
  return (
    <TaskFooter {...testMarks.task.clusterSetup.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Setup cluster"
        preAction={() => setupCluster()}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
