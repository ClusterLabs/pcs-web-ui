import {subDataTest} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const dataTest = subDataTest("setupCluster.nameAndNodes");

export const NameAndNodesFooter = () => {
  const {isClusterNameValid, areNodeNamesValid} = useTask();
  return (
    <TaskFooter dataTest={() => dataTest(".")}>
      <WizardFooterNext
        actionIf={isClusterNameValid && areNodeNamesValid}
        dataTest={() => dataTest("next")}
      />
      <TaskButtonBack dataTest={() => dataTest("back")} disabled={true} />
      <TaskButtonCancel dataTest={() => dataTest("cancel")} />
    </TaskFooter>
  );
};
