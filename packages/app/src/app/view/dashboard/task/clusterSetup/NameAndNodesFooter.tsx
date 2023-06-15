import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.setupCluster.nameAndNodes;

export const NameAndNodesFooter = () => {
  const {isClusterNameValid, areNodeNamesValid} = useTask();
  return (
    <TaskFooter {...testMarks.setupCluster.nameAndNodes.mark}>
      <WizardFooterNext
        actionIf={isClusterNameValid && areNodeNamesValid}
        {...next.mark}
      />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
