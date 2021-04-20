import React from "react";

import { TaskSimple } from "app/view/share";

import { useTask } from "./useTask";
import { ResourceCreateGroupForm } from "./ResourceCreateGroupForm";
import { ResourceCreateGroupFinish } from "./ResourceCreateGroupFinish";
import { ResourceCreateGroupFooter } from "./ResourceCreateGroupFooter";

export const ResourceCreateGroup: React.FC = () => {
  const {
    close,
    state: { response },
  } = useTask();

  return (
    <TaskSimple
      title="Create group"
      close={close}
      footer={<ResourceCreateGroupFooter />}
    >
      {response !== "success" && <ResourceCreateGroupForm />}
      {response === "success" && <ResourceCreateGroupFinish />}
    </TaskSimple>
  );
};
