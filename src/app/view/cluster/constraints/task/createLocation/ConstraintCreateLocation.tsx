import React from "react";

import { TaskSimple } from "app/view/share";

import { useTask } from "./useTask";
import { ConstraintCreateLocationConfigure } from "./ConstraintCreateLocationConfigure";
import { ConstraintCreateLocationFinish } from "./ConstraintCreateLocationFinish";
import { ConstraintCreateLocationFooter } from "./ConstraintCreateLocationFooter";

export const ConstraintCreateLocation: React.FC = () => {
  const {
    close,
    state: {
      call: { response },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Create location constraint"
      close={close}
      footer={<ConstraintCreateLocationFooter />}
    >
      {response === "" && <ConstraintCreateLocationConfigure />}
      {response !== "" && <ConstraintCreateLocationFinish />}
    </TaskSimple>
  );
};
