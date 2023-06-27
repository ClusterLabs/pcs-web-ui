import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {addExistringCluster, back, cancel} =
  testMarks.importExistingCluster.prepareNodeFooter;

export const PrepareNodeFooter = () => {
  const {isNodeCheckDoneValid, importCluster} = useTask();
  return (
    <TaskFooter {...testMarks.setupCluster.nameAndNodesFooter.mark}>
      <WizardFooterNext
        label="Add existing cluster"
        preAction={importCluster}
        disabled={!isNodeCheckDoneValid}
        {...addExistringCluster.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
