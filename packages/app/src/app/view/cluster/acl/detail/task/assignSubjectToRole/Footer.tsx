import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {aclAssignSubjectToRole} = testMarks.task;

export const Footer = () => {
  const {label, assign, isAssigneeValid, itemsOffer} = useTask();
  return (
    <>
      <TaskButtonNext
        run={assign}
        runIf={isAssigneeValid}
        disabled={itemsOffer.length === 0}
        {...aclAssignSubjectToRole.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...aclAssignSubjectToRole.cancel.mark} />
    </>
  );
};
