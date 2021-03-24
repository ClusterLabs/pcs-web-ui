import React from "react";

import { TaskSimple } from "app/view/share";

import { useWizard } from "./useWizard";
import { ConstraintCreateLocationConfigure } from "./ConstraintCreateLocationConfigure";
import { ConstraintCreateLocationFinish } from "./ConstraintCreateLocationFinish";
import { ConstraintCreateLocationFooter } from "./ConstraintCreateLocationFooter";

export const ConstraintCreateLocation: React.FC = () => {
  const {
    close,
    state: { response },
  } = useWizard();

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
