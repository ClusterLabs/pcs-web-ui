import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {constraintTicketCreate: task} = testMarks.task;

export const Footer = () => {
  const {label, createTicket} = useTask();
  return (
    <>
      <TaskButtonNext
        run={() => createTicket({force: false})}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
