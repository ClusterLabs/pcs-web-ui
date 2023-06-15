import {subDataTest} from "app/view/dataTest";
import {
  NodeAuthWizardFooter,
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonReviewAndFinish,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const dataTest = subDataTest("setupCluster.prepareNodes");

export const PrepareNodesFooter = () => {
  const {
    isClusterNameAndNodeCheckDoneValid,
    state: {authProcessId},
  } = useTask();

  if (authProcessId) {
    return <NodeAuthWizardFooter authProcessId={authProcessId} />;
  }

  return (
    <TaskFooter dataTest={() => dataTest(".")}>
      <WizardFooterNext
        dataTest={() => dataTest("next")}
        disabled={!isClusterNameAndNodeCheckDoneValid}
      />
      <TaskButtonBack dataTest={() => dataTest("back")} />
      <TaskButtonReviewAndFinish
        label="Review and setup cluster"
        dataTest={() => dataTest("reviewAndFinish")}
      />
      <TaskButtonCancel dataTest={() => dataTest("cancel")} />
    </TaskFooter>
  );
};
