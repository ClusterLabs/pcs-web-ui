import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {nodeNameFooter} = testMarks.task.clusterImportExisting;
const {checkAuthentication, back, cancel} = nodeNameFooter;

export const NodeNameFooter = () => {
  const {isNodeNameValid} = useTask();
  return (
    <TaskFooter {...nodeNameFooter.mark}>
      <TaskButtonWizardNext
        label="Check authentication"
        actionIf={isNodeNameValid}
        {...checkAuthentication.mark}
      />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
