import {TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";

export const Footer = () => {
  const {label, sbdDisable} = useTask();
  return (
    <TaskSimpleFooter run={() => sbdDisable({force: false})} runLabel={label} />
  );
};
