import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  TaskButtonWizardNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.clusterSetup.nameAndNodesFooter;

export const NameAndNodesFooter = () => {
  const {isClusterNameValid, areNodeNamesValid} = useTask();
  return (
    <TaskFooter {...testMarks.task.clusterSetup.nameAndNodesFooter.mark}>
      <TaskButtonWizardNext
        actionIf={isClusterNameValid && areNodeNamesValid}
        {...next.mark}
      />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
