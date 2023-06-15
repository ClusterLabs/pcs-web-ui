import {subDataTest} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const dataTest = subDataTest("setupCluster.review");

export const ReviewFooter = () => {
  const {setupCluster} = useTask();
  return (
    <TaskFooter dataTest={() => dataTest(".")}>
      <WizardFooterNext
        label="Setup cluster"
        preAction={() => setupCluster()}
        dataTest={() => dataTest("next")}
      />
      <TaskButtonBack dataTest={() => dataTest("back")} />
      <TaskButtonCancel dataTest={() => dataTest("cancel")} />
    </TaskFooter>
  );
};
