import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.createFenceDevice.reviewFooter;

export const ReviewFooter = () => {
  const {create} = useTask();
  return (
    <TaskFooter {...testMarks.setupCluster.reviewFooter.mark}>
      <WizardFooterNext
        label="Create fence device"
        preAction={() => create({force: false})}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
