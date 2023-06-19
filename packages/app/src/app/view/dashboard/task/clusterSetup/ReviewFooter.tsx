import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.setupCluster.reviewFooter;

export const ReviewFooter = () => {
  const {setupCluster} = useTask();
  return (
    <TaskFooter {...testMarks.setupCluster.reviewFooter.mark}>
      <WizardFooterNext
        label="Setup cluster"
        preAction={() => setupCluster()}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
