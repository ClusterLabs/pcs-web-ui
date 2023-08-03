import {testMarks} from "app/view/dataTest";
import {
  NodesAuthNext,
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonReviewAndFinish,
  TaskFooter,
  TaskButtonWizardNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {auth, next, back, cancel, reviewAndFinish} =
  testMarks.task.clusterSetup.prepareNodesFooter;

export const PrepareNodesFooter = () => {
  const {
    isClusterNameAndNodeCheckDoneValid,
    state: {authProcessId},
  } = useTask();

  return (
    <TaskFooter {...testMarks.task.clusterSetup.prepareNodesFooter.mark}>
      {authProcessId ? (
        <NodesAuthNext authProcessId={authProcessId} {...auth.mark} />
      ) : (
        <TaskButtonWizardNext
          disabled={!isClusterNameAndNodeCheckDoneValid}
          {...next.mark}
        />
      )}
      <TaskButtonBack {...back.mark} />
      <TaskButtonReviewAndFinish
        label="Review and setup cluster"
        {...reviewAndFinish.mark}
      />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
