import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  TaskButtonWizardNext,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.nodeAdd.addressesFooter;

export const AddressesFooter = () => {
  return (
    <TaskFooter {...testMarks.task.nodeAdd.addressesFooter.mark}>
      <TaskButtonWizardNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
