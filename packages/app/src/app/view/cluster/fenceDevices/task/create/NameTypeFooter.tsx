import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.createFenceDevice.nameTypeFooter;

export const NameTypeFooter = () => {
  const {isNameTypeValid} = useTask();
  return (
    <TaskFooter {...testMarks.createFenceDevice.nameTypeFooter.mark}>
      <WizardFooterNext actionIf={isNameTypeValid} {...next.mark} />
      <TaskButtonBack disabled={true} {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
