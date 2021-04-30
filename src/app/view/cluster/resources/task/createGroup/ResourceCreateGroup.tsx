import React from "react";

import { TaskSimple } from "app/view/share";

import { useTask } from "./useTask";
import { Form } from "./Form";
import { Finish } from "./Finish";
import { Footer } from "./Footer";

export const ResourceCreateGroup: React.FC = () => {
  const {
    close,
    state: { response },
  } = useTask();

  return (
    <TaskSimple title="Create group" close={close} footer={<Footer />}>
      {response !== "success" && <Form />}
      {response === "success" && <Finish />}
    </TaskSimple>
  );
};
