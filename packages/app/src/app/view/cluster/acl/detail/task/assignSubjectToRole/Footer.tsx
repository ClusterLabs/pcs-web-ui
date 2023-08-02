import {TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";

export const Footer = () => {
  const {label, assign, isAssigneeValid, itemsOffer} = useTask();
  return (
    <TaskSimpleFooter
      nextIf={isAssigneeValid}
      nextDisabled={itemsOffer.length === 0}
      run={assign}
      runLabel={label}
    />
  );
};
