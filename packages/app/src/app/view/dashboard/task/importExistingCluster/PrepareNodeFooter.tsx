import {testMarks} from "app/view/dataTest";
import {
  NodesAuthWizardNext,
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {addExistringCluster, back, cancel, authenticate} =
  testMarks.task.clusterImportExisting.prepareNodeFooter;

export const PrepareNodeFooter = () => {
  const {
    isNodeCheckDoneValid,
    importCluster,
    state: {authProcessId},
  } = useTask();
  return (
    <TaskFooter
      {...testMarks.task.clusterImportExisting.prepareNodeFooter.mark}
    >
      {authProcessId ? (
        <NodesAuthWizardNext
          authProcessId={authProcessId}
          {...authenticate.mark}
        />
      ) : (
        <WizardFooterNext
          label="Add existing cluster"
          preAction={importCluster}
          disabled={!isNodeCheckDoneValid}
          {...addExistringCluster.mark}
        />
      )}
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
