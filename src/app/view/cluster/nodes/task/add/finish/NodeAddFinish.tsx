import React from "react";

import { TaskProgress } from "app/view/share";

import { useTask } from "../useTask";

import { NodeAddFinishSuccess } from "./NodeAddFinishSuccess";
import { NodeAddFinishFail } from "./NodeAddFinishFail";
import { NodeAddFinishError } from "./NodeAddFinishError";

export const NodeAddFinish: React.FC = () => {
  const {
    state: { response, nodeName },
  } = useTask();
  switch (response) {
    case "success":
      return <NodeAddFinishSuccess />;
    case "fail":
      return <NodeAddFinishFail />;
    case "communication-error":
      return <NodeAddFinishError />;
    default:
      return (
        <TaskProgress
          title={`Add node "${nodeName}" progress`}
          progressTitle="Adding node"
        />
      );
  }
};
