import React from "react";

import { TaskProgress } from "app/view/share";

import { useTask } from "../useTask";

import { ResourceCreateFinishSuccess } from "./ResourceCreateFinishSuccess";
import { ResourceCreateFinishFail } from "./ResourceCreateFinishFail";
import { ResourceCreateFinishError } from "./ResourceCreateFinishError";

export const ResourceCreateFinish: React.FC = () => {
  const {
    state: { response, resourceName },
  } = useTask();
  switch (response) {
    case "success":
      return <ResourceCreateFinishSuccess />;
    case "fail":
      return <ResourceCreateFinishFail />;
    case "communication-error":
      return <ResourceCreateFinishError />;
    default:
      return (
        <TaskProgress
          title={`Create new resource "${resourceName}" progress`}
          progressTitle="Creating resource"
        />
      );
  }
};
