import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.addNode.reviewFooter;

export const ReviewFooter = () => {
  const {nodeAdd} = useTask();
  return (
    <TaskFooter {...testMarks.setupCluster.reviewFooter.mark}>
      <WizardFooterNext label="Add node" preAction={nodeAdd} {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
