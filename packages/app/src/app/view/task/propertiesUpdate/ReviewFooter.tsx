import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.propertiesUpdate.reviewFooter;

export const ReviewFooter = () => {
  const {propertiesUpdate} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceCreate.reviewFooter.mark}>
      <TaskButtonWizardNext
        label="Edit cluster properties"
        preAction={() => propertiesUpdate({force: false})}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
