import {testMarks} from "app/view/dataTest";
import {
  NodeAuthWizardFooter,
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonReviewAndFinish,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel, reviewAndFinish} =
  testMarks.setupCluster.prepareNodesFooter;

export const PrepareNodesFooter = () => {
  const {
    isClusterNameAndNodeCheckDoneValid,
    state: {authProcessId},
  } = useTask();

  if (authProcessId) {
    return <NodeAuthWizardFooter authProcessId={authProcessId} />;
  }

  return (
    <TaskFooter {...testMarks.setupCluster.prepareNodesFooter.mark}>
      <WizardFooterNext
        disabled={!isClusterNameAndNodeCheckDoneValid}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonReviewAndFinish
        label="Review and setup cluster"
        {...reviewAndFinish.mark}
      />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
