import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

const {next, back, cancel} = testMarks.task.fenceDeviceCreate.settingsFooter;

export const SettingsFooter = () => {
  return (
    <TaskFooter {...testMarks.task.fenceDeviceCreate.settingsFooter.mark}>
      <WizardFooterNext {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
