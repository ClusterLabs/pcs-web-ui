import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceCreate.instanceAttrsFooter;

export const InstanceAttrsFormFooter = () => {
  const {areInstanceAttrsValid, isAgentLoaded} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceCreate.instanceAttrsFooter.mark}>
      <WizardFooterNext
        actionIf={areInstanceAttrsValid}
        disabled={!isAgentLoaded}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
