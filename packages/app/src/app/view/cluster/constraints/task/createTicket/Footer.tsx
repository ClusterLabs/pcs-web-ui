import {TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";

export const Footer = () => {
  const {label, createTicket} = useTask();
  return (
    <TaskSimpleFooter
      run={() => createTicket({force: false})}
      runLabel={label}
    />
  );
};
