import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNextWithValidation} from "app/view/share";

import {useTask} from "./useTask";

const {constraintTicketCreate: task} = testMarks.task;

export const Footer = () => {
  const {label, createTicket} = useTask();
  return (
    <>
      <TaskButtonNextWithValidation
        run={() => createTicket({force: false})}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNextWithValidation>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
