import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {nodeNameFooter} = testMarks.task.clusterImportExisting;
const {checkAuthentication, back, cancel} = nodeNameFooter;

export const NodeNameFooter = () => {
  const {isNodeNameValid} = useTask();
  return (
    <TaskFooter {...nodeNameFooter.mark}>
      <WizardFooterNext
        label="Check authentication"
        actionIf={isNodeNameValid}
        {...checkAuthentication.mark}
      />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
