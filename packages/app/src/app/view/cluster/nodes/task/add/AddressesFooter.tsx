import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.nodeAdd.addressesFooter;

export const AddressesFooter = () => {
  return (
    <TaskFooter {...testMarks.task.nodeAdd.addressesFooter.mark}>
      <WizardFooterNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
