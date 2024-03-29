import {testMarks} from "app/view/dataTest";
import {
  NodesAuthNext,
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonWizardNext,
  TaskFooter,
} from "app/view/share";

import {useTask} from "./useTask";

const {auth, next, back, cancel} = testMarks.task.nodeAdd.prepareNodeFooter;

export const PrepareNodeFooter = () => {
  const {
    isNodeCheckDoneValid,
    state: {authProcessId},
  } = useTask();

  return (
    <TaskFooter {...testMarks.task.nodeAdd.prepareNodeFooter.mark}>
      {authProcessId ? (
        <NodesAuthNext authProcessId={authProcessId} {...auth.mark} />
      ) : (
        <TaskButtonWizardNext disabled={!isNodeCheckDoneValid} {...next.mark} />
      )}
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
