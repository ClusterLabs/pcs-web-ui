import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.addNode.nodeNameFooter;

export const NodeNameFooter = () => {
  const {isNameValid} = useTask();
  return (
    <TaskFooter {...testMarks.task.addNode.nodeNameFooter.mark}>
      <WizardFooterNext actionIf={isNameValid} {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
