import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.propertiesUpdate.propertiesFooter;

export const PropertiesFooter = () => {
  const {hasChanges} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceCreate.nameTypeFooter.mark}>
      <TaskButtonWizardNext actionIf={hasChanges} {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
