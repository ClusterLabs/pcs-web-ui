import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.createResource.reviewFooter;

export const ReviewFooter = () => {
  const {create} = useTask();
  return (
    <TaskFooter {...testMarks.setupCluster.reviewFooter.mark}>
      <WizardFooterNext
        label="Create resource"
        preAction={() => create({force: false})}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
