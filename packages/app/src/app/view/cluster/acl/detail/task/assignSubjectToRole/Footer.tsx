import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNextWithValidation} from "app/view/share";

import {useTask} from "./useTask";

const {aclAssignSubjectToRole} = testMarks.task;

export const Footer = () => {
  const {label, assign, isAssigneeValid, itemsOffer} = useTask();
  return (
    <>
      <TaskButtonNextWithValidation
        run={assign}
        runIf={isAssigneeValid}
        disabled={itemsOffer.length === 0}
        {...aclAssignSubjectToRole.run.mark}
      >
        {label}
      </TaskButtonNextWithValidation>
      <TaskButtonCancel {...aclAssignSubjectToRole.cancel.mark} />
    </>
  );
};
